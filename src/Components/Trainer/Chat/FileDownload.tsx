import  { FC } from 'react';
import { FaFileDownload } from 'react-icons/fa';

type Props = {
    url: string;
};

const FileDownload: FC<Props> = ({ url }) => {
    const fileNameRegex = /_(.+)/;
    const match = url.match(fileNameRegex);
    const fileName = match ? match[1] : "";
    const handleDownload = () => {
        window.open(url, '_blank');
    };

    return (
        <div className="flex items-center  pb-3 ">
            <div className='border bg-green-400 pt-3 pb-5 rounded-lg pr-3 pl-3 ' onClick={handleDownload}>
            <span className="mr-2">{fileName}</span>
            {/* <FaEye className="text-blue-500 cursor-pointer" onClick={() => window.open(url, '_blank')} /> */}
            <FaFileDownload className="text-green-500 mt-2 cursor-pointer"  />
            </div>
        </div>
    );
};

export default FileDownload;