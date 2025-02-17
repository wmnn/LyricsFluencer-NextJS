// @ts-ignore  
import { env } from '@lyricsfluencer/env'

export async function handleTranslate(text, targetLanguage): Promise<string[]> {
    try {
        // const res = JSON.parse(cachedResult);
        const lyrics = text.join('\n')
        const res = await (await fetch('https://translation.googleapis.com/language/translate/v2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                q: lyrics,
                key: env.GOOGLETRANSLATEAPIKEY,
                target: targetLanguage,
                format: 'text',
            }).toString(),
        })).json()
        // console.log(JSON.stringify(res))
        
        return res.data.translations[0].translatedText.split('\n');
    } catch (e) {
        console.log(e)
        return []
    }
}

// const cachedResult = `{"data":{"translations":[{"translatedText":"Leuchte hell wie ein Diamant\nLeuchte hell wie ein Diamant\n\nFinde Licht im wunderschönen Meer, ich entscheide mich, glücklich zu sein\nDu und ich, du und ich, wir sind wie Diamanten am Himmel\nIch sehe, du bist eine Sternschnuppe, eine Vision der Ekstase\nWenn du mich hältst, bin ich lebendig, wir sind wie Diamanten am Himmel\n\nIch wusste, dass wir sofort eins werden würden\nOh, sofort\nAuf den ersten Blick spürte ich die Energie der Sonnenstrahlen\nIch sah das Leben in deinen Augen\n\nAlso leuchte hell, heute Nacht, du und ich\nWir sind wunderschön wie Diamanten am Himmel\nAuge in Auge, so lebendig\nWir sind wunderschön wie Diamanten am Himmel\n\nLeuchte hell wie ein Diamant (whoa)\nLeuchte hell wie ein Diamant (whoa)\nLeuchte hell wie ein Diamant\nWir sind wunderschön wie Diamanten am Himmel\n...\n\n******** Dieser Liedtext ist NICHT für kommerzielle Zwecke bestimmt *******\n(1409623127630)","detectedSourceLanguage":"en"}]}}`