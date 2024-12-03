import { useState } from "react";
import { generateOpenAiImageResponse } from "wasp/client/operations";
import { useNavigate } from 'react-router-dom';

export default function DrawRequestPage() {
    const navigate = useNavigate();
    const [description, setDescription] = useState<string>('');
    const [useColor, setUseColor] = useState(false);
    const [quality, setQuality] = useState('s');
    const [isGenerating, setGenerating] = useState<boolean>(false);

    const handleGenerateImage = async () => {
        try {
            setGenerating(true);
        
            const response = await generateOpenAiImageResponse({
                prompt: description,
                quality: quality,
                useColor: useColor,
            });

            if (response) {
                navigate("/prompt/" + response.filename);
            }

        } catch (err: any) {
            window.alert('Error: ' + (err.message || 'Something went wrong'));
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>
    
            <p className="mt-4 text-gray-500 text-gray-700 dark:text-gray-200">
              Lass dir ein Bild erstellen.
            </p>
          </div>
    
          <form action="#" className="mx-auto mb-0 mt-8 max-w-xl space-y-4">
    
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Beschreibung
              </label>
    
              <textarea
                id="description"
                className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                rows={4}
                placeholder="Gibt hier eine Bildbeschreibung ein."
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
              ></textarea>
            </div>
    
            <div>
              <label htmlFor="quality" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Größe</label>
    
              <select
                name="quality"
                id="quality"
                className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                value={quality}
                onChange={e => setQuality(e.target.value)}
              >
                <option value='s'>Klein</option>
                <option value='m'>Medium</option>
                <option value='b'>Groß</option>
              </select>
            </div>
    
            <div>
              <label htmlFor="makeBlackAndWhite" className="flex gap-4">
                <input
                  type="checkbox"
                  id="makeBlackAndWhite"
                  name="marketing_accept"
                  className="size-5 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-gray-900"
                  onChange={() => setUseColor(!useColor)}
                  checked={useColor}
                />
    
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  Erzeuge ein Schwarz/Weiß-Bild
                </span>
              </label>
            </div>
    
            <div>
    
              <button
                type="button"
                  className="mt-1.5 w-full inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                onClick={() => handleGenerateImage()}
                disabled={isGenerating}
              >
                {isGenerating ? "Generiere" : "Los"}
              </button>
            </div>
          </form>
        </div>
      );
}