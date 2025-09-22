export default function Footer({onSummarize, onExportMarkdown}: {onSummarize: () => void; onExportMarkdown: () => void}) {
    return (
        <section className="h-30 bg-[#1a1a1a] text-[#000000] flex flex-col  p-3 space-y-4 items-center">

            <div className="ml-5 flex space-x-2 gap-3 mr-5 p-10">
                <Button onClick={onSummarize} className="px-4 bg-[#faf953] hover:bg-[#e5e247]">Summarize</Button>
                <Button onClick={onExportMarkdown} className="px-2 bg-[#333333] hover:bg-[#444444]  text-white text-sm">Export to Markdown</Button>
            </div>
        </section>
    )
}

function Button({className = "", ...props}) {
    return (
        <button
        className={`font-bitcount rounded hover:cursor-default ${className}`}
        {...props}
        >
        </button>
    )
}