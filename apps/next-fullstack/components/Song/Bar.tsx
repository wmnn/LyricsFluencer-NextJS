import Word from "./Word";

export default function Bar({ bar }) {

    function getWordsFromString(line): string[] {
        const words = line.split(/\s+/).map(word => {
            if (word.endsWith('\n')) {
                return word.slice(0, -1) + '\n'; // Retain the newline at the end of the word
            }
            return word;
        });
        return words;
    }
    
    return <div className="flex gap-1">
        {
            getWordsFromString(bar).map(word => {
                return <Word word={word} />
            })
        }
    </div>
}