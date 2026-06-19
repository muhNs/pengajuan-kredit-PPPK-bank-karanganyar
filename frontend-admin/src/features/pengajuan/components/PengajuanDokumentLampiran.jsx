import React, { useRef, useState, useEffect } from "react";

const useScrollReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" },
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);
  return { ref, isVisible };
};

// All icons use document style with different color accents
const DocIcon = ({ color, lines }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      d="M6 2h8.586a1 1 0 01.707.293l3.414 3.414A1 1 0 0119 6.414V21a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1z"
      fill={`${color}15`}
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 2v5h5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {lines.map((l, i) => (
      <line
        key={i}
        x1={l.x1}
        y1={l.y1}
        x2={l.x2}
        y2={l.y2}
        stroke={color}
        strokeWidth={l.w || 1.5}
        strokeLinecap="round"
        opacity={l.op || 1}
      />
    ))}
  </svg>
);

const IconKTP = () => (
  <DocIcon
    color="#3B82F6"
    lines={[
      { x1: 8, y1: 10, x2: 16, y2: 10 },
      { x1: 8, y1: 13, x2: 14, y2: 13, op: 0.6 },
      { x1: 8, y1: 16, x2: 12, y2: 16, op: 0.4 },
    ]}
  />
);
const IconKK = () => (
  <DocIcon
    color="#10B981"
    lines={[
      { x1: 8, y1: 10, x2: 16, y2: 10 },
      { x1: 8, y1: 13, x2: 16, y2: 13, op: 0.6 },
      { x1: 8, y1: 16, x2: 13, y2: 16, op: 0.4 },
    ]}
  />
);
const IconKTPPasangan = () => (
  <DocIcon
    color="#EC4899"
    lines={[
      { x1: 8, y1: 10, x2: 14, y2: 10 },
      { x1: 8, y1: 13, x2: 16, y2: 13, op: 0.6 },
      { x1: 8, y1: 16, x2: 11, y2: 16, op: 0.4 },
    ]}
  />
);
const IconSuratNikah = () => (
  <DocIcon
    color="#F59E0B"
    lines={[
      { x1: 8, y1: 10, x2: 16, y2: 10, w: 2 },
      { x1: 8, y1: 13, x2: 15, y2: 13, op: 0.6 },
      { x1: 8, y1: 16, x2: 12, y2: 16, op: 0.4 },
    ]}
  />
);
const IconIjazah = () => (
  <DocIcon
    color="#8B5CF6"
    lines={[
      { x1: 8, y1: 10, x2: 16, y2: 10 },
      { x1: 8, y1: 13, x2: 16, y2: 13, op: 0.6 },
      { x1: 8, y1: 16, x2: 16, y2: 16, op: 0.4 },
    ]}
  />
);
const IconSK = () => (
  <DocIcon
    color="#6366F1"
    lines={[
      { x1: 8, y1: 10, x2: 16, y2: 10, w: 2 },
      { x1: 8, y1: 13, x2: 16, y2: 13, op: 0.6 },
      { x1: 8, y1: 16, x2: 14, y2: 16, op: 0.4 },
    ]}
  />
);
const IconNPWP = () => (
  <DocIcon
    color="#F97316"
    lines={[
      { x1: 8, y1: 10, x2: 16, y2: 10 },
      { x1: 8, y1: 13, x2: 13, y2: 13, op: 0.6 },
      { x1: 8, y1: 16, x2: 15, y2: 16, op: 0.4 },
    ]}
  />
);

// KUNCI: Menyelaraskan Key dengan Enum DocumentType dari Prisma Backend
const DOC_LIST = [
  {
    enumKey: "KTP_KREDITUR",
    label: "KTP Kreditur",
    Icon: IconKTP,
    color: "#3B82F6",
  },
  { enumKey: "KK", label: "Kartu Keluarga", Icon: IconKK, color: "#10B981" },
  {
    enumKey: "KTP_PASANGAN",
    label: "KTP Pasangan",
    Icon: IconKTPPasangan,
    color: "#EC4899",
  },
  {
    enumKey: "SURAT_NIKAH",
    label: "Surat Nikah",
    Icon: IconSuratNikah,
    color: "#F59E0B",
  },
  {
    enumKey: "IJASAH_TERAKHIR",
    label: "Ijazah Terakhir",
    Icon: IconIjazah,
    color: "#8B5CF6",
  },
  { enumKey: "SK", label: "SK Pegawai", Icon: IconSK, color: "#6366F1" },
  { enumKey: "SURAT_NPWP", label: "NPWP", Icon: IconNPWP, color: "#F97316" },
];

// Komponen Kartu Khusus Sisi Admin (View & Download)
// ... (Bagian import, useScrollReveal, dan Icon-icon tetap sama persis seperti sebelumnya) ...

// Komponen Kartu Khusus Sisi Admin (View, Download & Upload/Replace)
const DocumentCard = ({
  label,
  Icon,
  color,
  fileData,
  enumKey,
  onUploadFile,
}) => {
  const fileInputRef = useRef(null); // Referensi untuk input file tersembunyi
  const BASE_URL_BACKEND =
    import.meta.env.VITE_API_URL?.replace("/api/v1", "") ||
    "http://localhost:5000/";

  const filePath = fileData?.filepath?.replace(/^\/+/, "") || "";
  const fileUrl = fileData ? `${BASE_URL_BACKEND}${filePath}` : "#";
  const isImage = fileData?.mime_type?.startsWith("image/");

  // Fungsi ketika admin memilih file baru dari komputernya
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Konfirmasi sebelum mengganti
      if (
        window.confirm(
          `Anda yakin ingin ${fileData ? "mengganti" : "mengunggah"} berkas ${label}?`,
        )
      ) {
        onUploadFile(enumKey, selectedFile);
      }
      // Reset input agar bisa memilih file yang sama lagi jika dibatalkan
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-col">
      {/* INPUT FILE TERSEMBUNYI */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*,.pdf"
      />

      <div
        className={`relative rounded-2xl border-2 overflow-hidden transition-all duration-300 group
                ${fileData ? "border-green-300 bg-green-50/20 shadow-sm hover:shadow-md" : "border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"}`}
        style={{ minHeight: "180px" }}
      >
        {fileData ? (
          <>
            {/* --- TAMPILAN JIKA FILE SUDAH ADA --- */}
            {isImage ? (
              <img
                src={fileUrl}
                alt={label}
                className="w-full h-44 object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-44 bg-blue-50/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-blue-500 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  DOKUMEN PDF
                </span>
              </div>
            )}

            <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Tersedia
            </div>

            {/* OVERLAY HOVER ACTIONS */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
              <button
                onClick={() => window.open(fileUrl, "_blank")}
                className="flex items-center gap-2 bg-white text-gray-800 hover:bg-[#FFC800] px-3 py-1.5 rounded-lg font-bold text-[10px] transition-colors shadow-lg w-[80%] justify-center"
              >
                Lihat Berkas
              </button>
              <a
                href={fileUrl}
                download={fileData.original_name}
                className="flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-700 px-3 py-1.5 rounded-lg font-bold text-[10px] transition-colors shadow-lg w-[80%] justify-center"
              >
                Unduh File
              </a>
              {/* TOMBOL GANTI FILE */}
              <button
                onClick={() => fileInputRef.current.click()}
                className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-500 px-3 py-1.5 rounded-lg font-bold text-[10px] transition-colors shadow-lg w-[80%] justify-center mt-1"
              >
                Ganti File
              </button>
            </div>
          </>
        ) : (
          <>
            {/* --- TAMPILAN JIKA FILE BELUM ADA (KOSONG) --- */}
            <div
              className="flex flex-col items-center justify-center h-44 gap-3 p-4 opacity-60 hover:opacity-100 cursor-pointer group/upload"
              onClick={() => fileInputRef.current.click()}
            >
              <div className="group-hover/upload:scale-110 transition-transform duration-300">
                <Icon />
              </div>
              <p className="text-[10px] font-bold text-gray-500 group-hover/upload:text-blue-600 border border-transparent group-hover/upload:border-blue-600 px-3 py-1 rounded-full transition-all">
                + Unggah File
              </p>
            </div>
            <div className="absolute top-2 left-2 bg-red-100 text-red-500 border border-red-200 text-[10px] font-bold px-2.5 py-1 rounded-full">
              Tidak Tersedia
            </div>
          </>
        )}
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        <span className="w-4 h-4 shrink-0 [&>svg]:w-4 [&>svg]:h-4">
          <Icon />
        </span>
        <span className="text-xs font-bold text-gray-700 truncate">
          {label}
        </span>
      </div>
      {fileData && (
        <p
          className="text-[10px] text-gray-500 mt-0.5 truncate px-5"
          title={fileData.original_name}
        >
          {fileData.original_name}
        </p>
      )}
    </div>
  );
};

export default function PengajuanDokumentLampiran({
  berkas = [],
  onUploadDokumen,
}) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
        <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
          <div className="w-1.5 h-5 bg-[#FFC800] rounded-full"></div>
          Dokumen Pendukung Nasabah
        </h3>
        <p className="text-xs text-gray-500 mt-1 ml-4">
          Berkas yang telah diunggah. Admin dapat melihat, mengunduh, atau
          mengganti berkas jika diperlukan.
        </p>
      </div>
      <div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-5">
        {DOC_LIST.map((doc, i) => {
          const foundFile = berkas.find((b) => b.document_type === doc.enumKey);
          return (
            <div
              key={doc.enumKey}
              className="transform transition-all duration-500 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <DocumentCard
                label={doc.label}
                Icon={doc.Icon}
                color={doc.color}
                fileData={foundFile}
                enumKey={doc.enumKey}
                onUploadFile={onUploadDokumen} // Lempar fungsi upload ke atas
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
