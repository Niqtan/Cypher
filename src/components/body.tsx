import { TypeAnimation } from "react-type-animation"


export default function AIBody({summary, loading}: {summary: string | undefined; loading: boolean}){
    return (
        <section className="bg-[#1a1a1a] text-[#faf953] flex-1 overflow-y-auto p-4">
            { /* Body */}
            <div>
               {loading ? (
                    <p className="font-robotocondensed">Summarizing... Please Wait</p>
                ): summary ? (
                    <div className="font-robotocondensed bg-[#2e2e2e] mt-16 p-4 flex  items-center">
                        <img src="./cypher.jpg" className="w-10 mr-2" />
                        <TypeAnimation
                    sequence={[
                        '',
                        1000,
                        summary || 'No Summary Yet',
                        1000
                        ]}
                        wrapper="span"
                        speed={75}
                        style={{ fontSize: '0.8em', display: 'block', whiteSpace: 'normal', wordBreak: 'break-word'}}
                        repeat={0}
                        />
                    </div>
                ) : (
                    <p></p>
                )} 
            </div>
        </section>
    )
}