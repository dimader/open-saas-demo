import { GenerateOpenAiImageResponse } from "wasp/server/operations";
import { HttpError } from 'wasp/server';
import OpenAI from 'openai';
import { get } from 'node:https';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { ImagesApi } from "wasp/server/api";

const openai = setupOpenAI();
function setupOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    return new HttpError(500, 'OpenAI API key is not set');
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export type GenerateOpenAiImageResponseInput = {
    prompt: string;
    useColor: boolean;
    quality: string;
};
export type GenerateOpenAiImageResponseOutput = {
    filename: string;
};
export const generateOpenAiImageResponse: GenerateOpenAiImageResponse<GenerateOpenAiImageResponseInput, GenerateOpenAiImageResponseOutput> = 
    async (args, context) => {

    try {
        if (openai instanceof Error) {
            throw openai;
        }

        const colorPrompt = args.useColor ? ' Erstelle das Bild in Schwarz-Weiß. Verwende keine Farben!' : '';
        // von DALL-E-2 unterstützte Größen:
        const size = args.quality === "b" ? "1024x1024" : args.quality === "m" ? "512x512" : "256x256";
        // von DALL-E-3 unterstützte Größen:
        // const size = args.quality === "b" ? "1792x1024" : args.quality === "m" ? "1024x1792" : "1024x1024";
    
        const gtpRequest: OpenAI.Images.ImageGenerateParams = {
            model: "dall-e-2",
            prompt: args.prompt + colorPrompt,
            n: 1,
            size: size,
        };

        const generateResponse = await openai.images.generate(gtpRequest);

        console.log(JSON.stringify(generateResponse, undefined, 2));
        console.log("\n");

        const downloadUrl = generateResponse.data[0].url as string;
        const filename = "img-" + uuidv4() + ".png";
        const filePath = process.env.IMAGE_FILE_PATH + "/" + filename;

        get(downloadUrl, (res: any) => {
            const file = fs.createWriteStream(filePath);

            res.pipe(file);
            file.on("finish", () => {
                file.close();
            });
        }).on("error", (e: any) => {
            console.log("Error occured on get" + JSON.stringify(e, undefined, 2));
        });
        
        return {
            filename: filename,
        };

    } catch (err: any) {
        console.error(err);
        throw new HttpError(500, "Error");
    }
};

export const imagesApi: ImagesApi<{id: string}, {image: any}> = (req, res, _context) => {
    let stream = fs.createReadStream(process.env.IMAGE_FILE_PATH + '/' + req.params.id);
    stream.on('open', function() {
      res.set('Content-Type', 'image/png');
      res.set('Cross-Origin-Resource-Policy', 'cross-origin'); // CORP
    
      stream.pipe(res);
    });
  
    stream.on('error', function () {
      res.set('Content-Type', 'text/plain');
      res.status(404).end('Not found');
    });
};
