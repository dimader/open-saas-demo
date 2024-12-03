import { useParams } from 'react-router-dom';
import { api } from "wasp/client/api";

export default function DrawResponsePage() {
    const { imagePath } = useParams();
    const backendUrl = api.getUri();
  
    return (<div className='flex flex-col'>
          
        <p className='italic mx-auto mt-6 mb-6 text-center text-3xl leading-8 text-gray-600 dark:text-white'>
          Das Ergebnis
        </p>
    
        <div className='-m-2 rounded-xl  lg:-m-4 lg:rounded-2xl lg:p-4 flex   justify-center items-center'>            
          <img
            src={backendUrl + '/assets/images/' + imagePath}
            className='rounded-md shadow-2xl ring-1 ring-gray-900/10 image-center'
          />
        </div>
      </div>
    );
}