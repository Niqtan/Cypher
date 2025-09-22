import type { SummaryData } from "./types"

export async function Summarize(): Promise<SummaryData> {
    try {
        const [tab] = await chrome.tabs.query({active: true, currentWindow: true})
        if (!tab.id) {
            console.error("No tab id!")
            return {
                summary: "Error Getting Tab ID",
                date: new Date().toISOString().split('T')[0],
                title: "error",
                url: ""
            }
        }

        const pageText = await getPageText(tab.id)

        const response  = await fetch("https://cypher-3gfhmwkyi-niqs-projects-c135a7ed.vercel.app/api/summarize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:  JSON.stringify({text: pageText.text})
        })

        const data = await response.json()
        console.log(data)
        
        const summaryData: SummaryData  = {
            summary: data.summary ?? "",
            date: new Date().toISOString().split('T')[0], //Should give us YYYY-MM-DD format
            title: pageText.title,
            url: pageText.url
        }

        return summaryData
    }
    catch (err) {
        console.error("Error Fetching summary: ", err)
        return {
            summary: "Error Getting summary",
            date: new Date().toISOString().split('T')[0], //Should give us YYYY-MM-DD format
            title: "error",
            url: ""
        }
    }
}



function getPageText(tabId: number): Promise<{text: string; title: string; url: string}> {
    return new Promise((resolve, reject) => {
        
        if (!tabId) {
            reject("No Tab ID is available")
            return;
        }

        chrome.scripting.executeScript(
        {
            target: {tabId},
            func: () => ({
                text: document.body.innerText,
                title: document.title, 
                url: window.location.href
            }),
        }, (results) => {
            if (results && results[0] && results[0].result) {
                    resolve(results[0].result)
            }
            else {
                reject("Result did not parse correctly.")
            }
        })
         
    
    });

} 

export async function exportToMarkdown(summaryData: SummaryData){
    const topic = "Topic Here" 

     const markdownContent = `
     ${summaryData.date}
     
     Tags: 

     # ${topic} - ${summaryData.title} - ${summaryData.date}

     ${summaryData.summary}

     # Reference(s):
     ${summaryData.url}
     
     `

    const blob = new Blob([markdownContent], {type: "text/markdown"})
    const url = URL.createObjectURL(blob)

    chrome.downloads.download({
        url: url,
        filename: `${topic} - ${summaryData.title.replace(/[^a-z0-9\s]/gi, '_')} - ${summaryData.date}_summary.md`,
        saveAs: true
    }, (downloadId) => {

    URL.revokeObjectURL(url)
    
    if (chrome.runtime.lastError) {
        console.error("Failed downloading the file: ", chrome.runtime.lastError)
    }
    else {
        console.log("Download started with: ", downloadId)
    }

    })
 }
