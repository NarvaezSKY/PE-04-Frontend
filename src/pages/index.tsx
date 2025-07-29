import { useRef, useState, useMemo, useEffect } from "react";
import { Input, Button, Divider, Card, Spinner } from "@heroui/react";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import DefaultLayout from "@/layouts/default";
import { useUpload } from "@/hooks/useUpload";

function getNextUpdateTime(): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const updateHours = [6, 9, 13, 18];

  for (let i = 0; i < updateHours.length; i++) {
    const updateTime = new Date(today);
    updateTime.setHours(updateHours[i], 0, 0, 0);
    if (now < updateTime) {
      return updateTime.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
  }

  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);
  nextDay.setHours(6, 0, 0, 0);
  return nextDay.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function IndexPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { uploadError, uploadFile, isLoading, uploadSuccess, clearUploadSuccess } = useUpload();

  useEffect(() => {
    if (uploadSuccess) {
      const timer = setTimeout(() => {
        clearUploadSuccess();
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [uploadSuccess, clearUploadSuccess]);

  const proximaActualizacion = useMemo(getNextUpdateTime, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    if (selectedFile) {
      await uploadFile(selectedFile);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <DefaultLayout>
      <div className="w-full bg-success-100 text-success text-center py-2 font-semibold shadow mb-4">
        Próxima actualización: {proximaActualizacion}
      </div>
      <section className="flex flex-col items-center justify-center gap-0 py-0 md:py-0">
        <div className="flex gap-4 mb-6">
          <a
            href="https://app.powerbi.com/view?r=eyJrIjoiYTYzZTllY2EtYzE4OS00OWNhLWI0N2ItYmJhZWU5OGMwMTRkIiwidCI6ImNiYzJjMzgxLTJmMmUtNGQ5My05MWQxLTUwNmM5MzE2YWNlNyIsImMiOjR9"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button color="primary" variant="flat" size="md" radius="sm">
              <HiOutlineDocumentReport className="inline-block mr-0 text-xl" />
              Ver en Power BI
            </Button>
          </a>
          <a
            href="https://docs.google.com/spreadsheets/d/1SVMzoxVOa-LqfnpgzwQCeApzdrUuGFlA6P-5eyAYfT4/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button color="secondary" variant="flat" size="md" radius="sm">
              <PiMicrosoftExcelLogo className="inline-block mr-0 text-xl" />
              Consulta la ultima version del PE-04
            </Button>
          </a>
        </div>
        <div className="border border-default-300 rounded-lg p-4 shadow-2xl">
          <iframe
            allowFullScreen={true}
            frameBorder="0"
            height="673.5"
            src="https://app.powerbi.com/view?r=eyJrIjoiYTYzZTllY2EtYzE4OS00OWNhLWI0N2ItYmJhZWU5OGMwMTRkIiwidCI6ImNiYzJjMzgxLTJmMmUtNGQ5My05MWQxLTUwNmM5MzE2YWNlNyIsImMiOjR9"
            title="Reporte PE-04"
            width="1000"
          />
        </div>
        <Divider className="my-6" />
        <Card className="w-full max-w-2xl p-6 shadow-lg">
          <h1 className="text-2xl">Subir Excel</h1>
          <span className="text-default-600 my-4">
            Ingrese el archivo Excel para actualizar los datos del reporte:
          </span>
          <div className="cursor-pointer my-2 flex gap-2 items-center">
            <Input
              accept=".xlsx, .xls"
              type="file"
              size="lg"
              fullWidth
              variant="flat"
              color="success"
              placeholder="Seleccionar archivo"
              className="cursor-pointer"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <Button
              color="success"
              size="lg"
              variant="ghost"
              onClick={handleUploadClick}
              disabled={!selectedFile || isLoading}
            >
              Subir
            </Button>
            <Button
              size="lg"
              variant="ghost"
              color="danger"
              onClick={handleClearFile}
              disabled={!selectedFile}
            >
              Limpiar
            </Button>
            {isLoading && (
              <Spinner color="success" size="lg" />
            )}

          </div>
          {uploadError && (
            <div className="text-red-500 mt-2">{uploadError}</div>
          )}
          {uploadSuccess && (
            <div className="text-green-500 mt-2">{uploadSuccess}</div>
          )}
        </Card>
      </section>
    </DefaultLayout>
  );
}
