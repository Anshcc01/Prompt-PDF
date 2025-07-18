import FileUploadComponent from './components/file-upload';

export default function Home() {
  return (
    <div>
      <div className="min-h-screen w-screen flex">
        <div className="w-[30vw] min-h-screen p-4 flex justify-center items-center">
          <FileUploadComponent />
        </div>
        
      </div>
    </div>
  );
}