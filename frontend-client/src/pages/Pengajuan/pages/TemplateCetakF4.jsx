import React from "react";

// Komponen ini didesain khusus untuk dicetak dengan kertas F4 (Folio)
export default function TemplateCetakF4({ formData, masterOptions }) {
    // Format Tanggal Indonesia Realtime (Contoh: 15 Mei 2026)
    const getTanggalSekarang = () => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        return new Date().toLocaleDateString("id-ID", options);
    };

    // Helper untuk format Rupiah
    const formatRp = (angka) => {
        if (!angka) return "";
        return new Intl.NumberFormat("id-ID").format(angka);
    };

    const instansiTerpilih = masterOptions?.instansi?.find(
        (item) => String(item.id) === String(formData.instansi),
    );

    // Lookup label teks dari masterOptions menggunakan ID yang tersimpan di formData
    const labelStatusRumah = masterOptions?.statusRumah?.find(
        (item) => String(item.id) === String(formData.status_rumah_id)
    )?.kepemilikan || "\u00A0";

    const labelStatusPernikahan = masterOptions?.statusPernikahan?.find(
        (item) => String(item.id) === String(formData.status_pernikahan_id)
    )?.status || "\u00A0";

    const labelJenisKelamin = masterOptions?.jenisKelamin?.find(
        (item) => String(item.id) === String(formData.jenis_kelamin_id)
    )?.gender || "\u00A0";

    // Ambil datanya, siapkan nilai "fallback" berupa titik-titik jika data kosong/belum dipilih
    const namaKepala =
        instansiTerpilih?.nama_kepala_dinas ||
        "...................................................";
    const nipKepala =
        instansiTerpilih?.nip_kepala_dinas || "..............................";
    const namaBendahara =
        instansiTerpilih?.nama_bendahara_dinas ||
        "...................................................";
    const nipBendahara =
        instansiTerpilih?.nip_bendahara_dinas || "..............................";

    return (
        <div
            className="hidden print:block bg-white text-black text-[11.5px] leading-tight w-[215.9mm] mx-auto"
            style={{
                fontFamily: '"Times New Roman", Times, serif',
                fontVariantNumeric: "tabular-nums",
            }}
        >
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @media print {
                    @page {
                        size: 215.9mm 330.2mm; /* Ukuran presisi F4 / Folio */
                        /* Margin Atas 5mm, Kanan 15mm, Bawah 10mm, Kiri 15mm */
                        margin: 5mm 15mm 10mm 15mm;
                    }

                    /* Pembersihan total sisa background abu-abu & padding layout */
                    body, html, #root, main, #root > div {
                        background-color: #FFFFFF !important;
                        padding-top: 0 !important;
                        margin-top: 0 !important;
                    }

                    body {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }

                    /* Memaksa semua elemen menggunakan Times New Roman & Angka Presisi */
                    * {
                        font-family: "Times New Roman", Times, serif !important;
                        font-variant-numeric: tabular-nums !important;
                    }

                    /* Menyembunyikan Navbar, Header, dan Footer bawaan website saat cetak */
                    nav, header, footer { display: none !important; }

                    .page-break { page-break-before: always; }

                    /* CSS khusus agar tabel dan garis lurus terlihat rapi */
                    td { vertical-align: bottom; padding-bottom: 2px; }
                    .garis-bawah { border-bottom: 1px solid black; }

                    /* Mencegah elemen terpotong di tengah-tengah halaman */
                    .avoid-break { page-break-inside: avoid; }
                }
            `,
                }}
            />

            {/* =======================================================================
                HALAMAN 1: PERMOHONAN KREDIT PEGAWAI
                ======================================================================= */}
            <div className="w-full relative pt-1">
                {/* =====================================================================
                    REVISI: Memperbesar logo (h-10) dan menyesuaikan padding banner (py-1.5)
                    ===================================================================== */}
                <div className="flex bg-[#CC0000] text-white py-1.5 px-3 items-center justify-between mb-4">
                    <div className="w-[40%] flex items-center">
                        <img
                            src="/images/f-logo.png"
                            alt="Logo Bank Karanganyar"
                            className="h-10 object-contain"
                        />
                    </div>
                    <div className="w-[60%] text-right pr-2">
                        <h1 className="text-lg font-bold tracking-wider leading-none mt-0.5">
                            PERMOHONAN KREDIT PEGAWAI
                        </h1>
                    </div>
                </div>

                {/* Surat Kepada */}
                <div className="flex justify-between mb-4">
                    <div>
                        <p>Kepada Yth,</p>
                        <p>Direksi PT BPR Bank Karanganyar</p>
                    </div>
                    <div>
                        <p>Karanganyar, {getTanggalSekarang()}</p>
                    </div>
                </div>

                <div className="mb-2">
                    {/* DATA PRIBADI PEMOHON */}
                    <div className="bg-[#CC0000] text-white font-bold px-2 py-0.5 flex justify-between mb-2 mt-3">
                        <span>DATA PRIBADI PEMOHON</span>
                        <span className="italic font-normal text-[9px] pt-0.5">
                            Mohon diisi dengan huruf cetak
                        </span>
                    </div>

                    <p className="mb-1">Dengan hormat,</p>
                    <p className="mb-3 text-justify">
                        Dengan ini kami mengajukan Permohonan Kredit Karyawan
                        Kepada PT BPR Bank Karanganyar dengan data kami
                        sampaikan dengan sebenar-benarnya dan kami sanggup
                        mempertanggung jawabkan kebenaran data secara hukum
                        sebagai berikut :
                    </p>

                    <table className="w-full mb-3 border-separate border-spacing-y-1">
                        <tbody>
                            <tr>
                                <td className="w-[32%]">
                                    Nama Lengkap Sesuai KTP
                                </td>
                                <td className="w-[2%]">:</td>
                                <td className="w-[66%] uppercase garis-bawah">
                                    {formData.nama || "\u00A0"}
                                </td>
                            </tr>
                            <tr>
                                <td>Alamat Tempat Tinggal</td>
                                <td>:</td>
                                <td className="uppercase garis-bawah">
                                    {formData.alamat || "\u00A0"}
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>:</td>
                                <td className="uppercase">
                                    Kodepos{" "}
                                    <span className="garis-bawah inline-block min-w-[100px] text-center">
                                        {formData.kode_pos || "\u00A0"}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>Nomor Handphone</td>
                                <td>:</td>
                                <td className="uppercase garis-bawah">
                                    {formData.no_telp || "\u00A0"}
                                </td>
                            </tr>
                            <tr>
                                <td>Status Rumah</td>
                                <td>:</td>
                                <td className="uppercase garis-bawah">
                                    {labelStatusRumah}
                                </td>
                            </tr>
                            <tr>
                                <td>Status Pernikahan</td>
                                <td>:</td>
                                <td className="uppercase">
                                    <span className="garis-bawah inline-block min-w-[150px]">
                                        {labelStatusPernikahan}
                                    </span>{" "}
                                    <span className="ml-8">
                                        Jenis Kelamin:{" "}
                                        <span className="garis-bawah inline-block min-w-[150px] text-center">
                                            {labelJenisKelamin}
                                        </span>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>Tanda Pengenal (KTP) Nomor</td>
                                <td>:</td>
                                <td className="uppercase garis-bawah">
                                    {formData.nik || "\u00A0"}
                                </td>
                            </tr>
                            <tr>
                                <td>NPWP</td>
                                <td>:</td>
                                <td className="uppercase garis-bawah">
                                    {formData.npwp || "\u00A0"}
                                </td>
                            </tr>
                            <tr>
                                <td>Pekerjaan</td>
                                <td>:</td>
                                <td className="uppercase garis-bawah">
                                    PEGAWAI PEMERINTAH DENGAN PERJANJIAN KERJA
                                    (PPPK)
                                </td>
                            </tr>
                            <tr>
                                <td>Nama Gadis Ibu Kandung</td>
                                <td>:</td>
                                <td className="uppercase garis-bawah">
                                    {formData.nama_ibu || "\u00A0"}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* DATA KHUSUS */}
                    <div className="bg-[#CC0000] text-white font-bold px-2 py-0.5 mb-1.5">
                        DATA KHUSUS
                    </div>
                    <table className="w-full mb-3 border-separate border-spacing-y-1">
                        <tbody>
                            <tr>
                                <td className="w-[32%]">Nama Instansi</td>
                                <td className="w-[2%]">:</td>
                                <td className="w-[66%] uppercase garis-bawah">
                                    {instansiTerpilih?.nama_instansi || "\u00A0"}
                                </td>
                            </tr>
                            <tr>
                                <td>Alamat Instansi / Kantor</td>
                                <td>:</td>
                                <td className="uppercase garis-bawah">
                                    {instansiTerpilih?.alamat || "\u00A0"}
                                </td>
                            </tr>
                            <tr>
                                <td>Jabatan dalam pekerjaan</td>
                                <td>:</td>
                                <td className="uppercase garis-bawah">
                                    {formData.jabatan || "\u00A0"}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* DATA KREDIT */}
                    <div className="bg-[#CC0000] text-white font-bold px-2 py-0.5 mb-1.5">
                        DATA KREDIT
                    </div>
                    <table className="w-full mb-3 border-separate border-spacing-y-1">
                        <tbody>
                            <tr>
                                <td className="w-[32%]">Jumlah Kredit</td>
                                <td className="w-[2%]">:</td>
                                <td className="w-[66%] uppercase garis-bawah font-bold">
                                    Rp.{" "}
                                    {formData.nominal_kredit
                                        ? formatRp(String(formData.nominal_kredit).replace(/\D/g, ''))
                                        : "\u00A0"}
                                </td>
                            </tr>
                            <tr>
                                <td>Kredit digunakan untuk</td>
                                <td>:</td>
                                <td className="uppercase garis-bawah">
                                    {formData.penggunaan_kredit || "\u00A0"}
                                </td>
                            </tr>
                            <tr>
                                <td>Penghasilan tetap per bulan</td>
                                <td>:</td>
                                <td className="uppercase garis-bawah">
                                    Rp.{" "}
                                    {formData.pendapatan_tetap
                                        ? formatRp(String(formData.pendapatan_tetap).replace(/\D/g, ''))
                                        : "\u00A0"}
                                </td>
                            </tr>
                            <tr>
                                <td>Penghasilan tidak tetap per bln</td>
                                <td>:</td>
                                <td className="uppercase garis-bawah">
                                    Rp.{" "}
                                    {formData.pendapatan_tidak_tetap
                                        ? formatRp(String(formData.pendapatan_tidak_tetap).replace(/\D/g, ''))
                                        : "\u00A0"}
                                </td>
                            </tr>
                            <tr>
                                <td>Jangka waktu pengambilan</td>
                                <td>:</td>
                                <td className="uppercase">
                                    <span className="garis-bawah inline-block min-w-[50px] text-center font-bold">
                                        {formData.tenor_kredit || "\u00A0"}
                                    </span>{" "}
                                    BULAN
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* DATA JAMINAN */}
                    <div className="bg-[#CC0000] text-white font-bold px-2 py-0.5 mb-1.5">
                        DATA JAMINAN
                    </div>
                    <table className="w-full mb-4 border-separate border-spacing-y-1">
                        <tbody>
                            <tr>
                                <td className="w-[32%]">Jaminan berupa</td>
                                <td className="w-[2%]">:</td>
                                <td className="w-[66%] garis-bawah font-bold">
                                    SK PPPK dan Ijazah Pendidikan Terakhir
                                </td>
                            </tr>
                            <tr>
                                <td>Atas nama</td>
                                <td>:</td>
                                <td className="uppercase garis-bawah font-bold">
                                    {formData.nama || "\u00A0"}
                                </td>
                            </tr>
                            <tr>
                                <td>Jaminan tambahan</td>
                                <td>:</td>
                                <td className="uppercase">
                                    <span className="garis-bawah inline-block min-w-[180px]">
                                        &nbsp;
                                    </span>{" "}
                                    Atas nama :{" "}
                                    <span className="garis-bawah inline-block min-w-[150px]">
                                        &nbsp;
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>Nama orang terdekat</td>
                                <td>:</td>
                                <td className="uppercase garis-bawah font-bold">
                                    {formData.nama_kerabat || "\u00A0"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="text-justify mb-5">
                    Demikian Permohonan Kredit Kami ajukan dan kami memberikan
                    kuasa penuh kepada bank untuk memeriksa kebenaran informasi
                    dan dokumen yang kami berikan. Saya bersedia dan akan
                    mentaati segala persyaratan dan peraturan bank, saya
                    bersedia membayar segala biaya yang timbul dari persyaratan
                    pengajuan permohonan ini. Dokumen yang kami lampirkan tidak
                    wajib dikembalikan apabila permohonan kami ditolak oleh
                    bank.
                </p>

                {/* TATA LETAK TANDA TANGAN 1 */}
                <div className="avoid-break flex justify-between text-center mt-6 mb-8">
                    <div className="w-1/3 flex flex-col justify-between items-center">
                        <p>Pemilik Jaminan / Penjamin</p>
                        <div className="h-16"></div>
                        <p className="uppercase">
                            ({" "}
                            <span className="garis-bawah inline-block min-w-[140px] text-center font-bold">
                                {formData.nama_penjamin || "\u00A0"}
                            </span>{" "}
                            )
                        </p>
                    </div>
                    <div className="w-1/3 flex flex-col justify-between items-center">
                        <p>Mengetahui Suami / Istri</p>
                        <div className="h-16"></div>
                        <p className="uppercase">
                            ({" "}
                            <span className="garis-bawah inline-block min-w-[140px] font-bold text-center">
                                {formData.nama_pasangan || "\u00A0"}
                            </span>{" "}
                            )
                        </p>
                    </div>
                    <div className="w-1/3 flex flex-col justify-between items-center">
                        <p>Pemohon</p>
                        <div className="h-16"></div>
                        <div>
                            <p className="uppercase font-bold underline leading-tight">
                                {formData.nama ||
                                    "..........................................."}
                            </p>
                            <p className="mt-1 leading-tight">
                                NIP/NRP/NIK:{" "}
                                {formData.nip || "........................."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* TATA LETAK TANDA TANGAN 2 */}
                <div className="avoid-break flex justify-between text-center mb-6">
                    <div className="w-1/3 flex flex-col justify-between items-center">
                        <div className="leading-tight">
                            <p>Menyetujui,</p>
                            <p>Plh. KEPALA DINAS / INSTANSI</p>
                        </div>
                        <div className="h-16"></div>
                        <div>
                            <p className="underline leading-tight font-bold uppercase">
                                {namaKepala}
                            </p>
                            <p className="leading-tight mt-1">
                                NIP/NRP/NIK : {nipKepala}
                            </p>
                        </div>
                    </div>
                    <div className="w-1/3"></div>
                    <div className="w-1/3 flex flex-col justify-between items-center">
                        <div className="leading-tight">
                            <p>Bendahara Gaji,</p>
                        </div>
                        <div className="h-16"></div>
                        <div>
                            <p className="underline leading-tight font-bold uppercase">
                                {namaBendahara}
                            </p>
                            <p className="leading-tight mt-1">
                                NIP/NRP/NIK : {nipBendahara}
                            </p>
                        </div>
                    </div>
                </div>

                {/* PERSETUJUAN DIREKSI */}
                <div className="avoid-break border-t-2 border-[#CC0000] pt-1">
                    <div className="bg-[#CC0000] text-white font-bold px-2 py-0.5 mb-3 text-center">
                        PERSETUJUAN DIREKSI
                    </div>
                    <div className="flex justify-between">
                        <div className="w-1/3">
                            <p className="mb-1 font-bold">Pertimbangan,</p>
                            <p className="border-b border-solid border-black mt-5 w-[90%]"></p>
                            <p className="border-b border-solid border-black mt-5 w-[90%]"></p>
                        </div>
                        <div className="w-1/3 text-center">
                            <p>
                                Menyetujui,
                                <br />
                                PT BPR Bank Karanganyar
                            </p>
                            <div className="h-10"></div>
                            <p className="border-b border-solid border-black mx-auto w-[80%]"></p>
                        </div>
                        <div className="w-1/3 text-center">
                            <p>
                                Mengetahui,
                                <br />
                                PT BPR Bank Karanganyar
                            </p>
                            <div className="h-10"></div>
                            <p className="border-b border-solid border-black mx-auto w-[80%]"></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* =======================================================================
                HALAMAN 2: SURAT PERNYATAAN (SLIK)
                ======================================================================= */}
            <div className="page-break w-full relative pt-4">
                <h1 className="text-xl font-bold text-center mb-6 underline">
                    SURAT PERNYATAAN
                </h1>
                <p className="mb-4">
                    Yang bertanda tangan di bawah ini, Kami :
                </p>

                <table className="w-full mb-6 border-separate border-spacing-y-2">
                    <tbody>
                        {/* DEBITUR */}
                        <tr>
                            <td className="w-[4%]">1.</td>
                            <td className="w-[15%]">Nama</td>
                            <td className="w-[2%]">:</td>
                            <td className="uppercase w-[55%] garis-bawah font-bold">
                                {formData.nama || "\u00A0"}
                            </td>
                            <td className="italic text-right">( Debitur )</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Alamat</td>
                            <td>:</td>
                            <td colSpan="2" className="uppercase garis-bawah">
                                {formData.alamat || "\u00A0"}
                            </td>
                        </tr>
                        <tr>
                            <td className="pb-3"></td>
                            <td className="pb-3">Nomor KTP</td>
                            <td className="pb-3">:</td>
                            <td colSpan="2" className="pb-3 garis-bawah">
                                {formData.nik || "\u00A0"}
                            </td>
                        </tr>

                        {/* PASANGAN DEBITUR */}
                        <tr>
                            <td>2.</td>
                            <td>Nama</td>
                            <td>:</td>
                            <td className="uppercase garis-bawah font-bold">
                                {formData.nama_pasangan || "\u00A0"}
                            </td>
                            <td className="italic text-right">
                                ( Istri/Suami Debitur )
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Alamat</td>
                            <td>:</td>
                            <td colSpan="2" className="uppercase garis-bawah">
                                {formData.alamat_pasangan || "\u00A0"}
                            </td>
                        </tr>
                        <tr>
                            <td className="pb-3"></td>
                            <td className="pb-3">Nomor KTP</td>
                            <td className="pb-3">:</td>
                            <td colSpan="2" className="pb-3 garis-bawah">
                                {formData.nik_pasangan || "\u00A0"}
                            </td>
                        </tr>

                        {/* PENJAMIN */}
                        <tr>
                            <td>3.</td>
                            <td>Nama</td>
                            <td>:</td>
                            <td className="garis-bawah font-bold uppercase">
                                {formData.nama_penjamin || "\u00A0"}
                            </td>
                            <td className="italic text-right">( Penjamin )</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Alamat</td>
                            <td>:</td>
                            <td colSpan="2" className="garis-bawah uppercase">
                                {formData.alamat_penjamin || "\u00A0"}
                            </td>
                        </tr>
                        <tr>
                            <td className="pb-3"></td>
                            <td className="pb-3">Nomor KTP</td>
                            <td className="pb-3">:</td>
                            <td
                                colSpan="2"
                                className="pb-3 garis-bawah uppercase"
                            >
                                {formData.nik_penjamin || "\u00A0"}
                            </td>
                        </tr>

                        {/* PASANGAN PENJAMIN */}
                        <tr>
                            <td>4.</td>
                            <td>Nama</td>
                            <td>:</td>
                            <td className="garis-bawah">
                                {formData.nama_pasangan_penjamin || "\u00A0"}
                            </td>
                            <td className="italic text-right">
                                ( Istri/Suami Penjamin )
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Alamat</td>
                            <td>:</td>
                            <td colSpan="2" className="garis-bawah">
                                {formData.alamat_pasangan_penjamin || "\u00A0"}
                            </td>
                        </tr>
                        <tr>
                            <td className="pb-3"></td>
                            <td className="pb-3">Nomor KTP</td>
                            <td className="pb-3">:</td>
                            <td colSpan="2" className="pb-3 garis-bawah">
                                {formData.nik_pasangan_penjamin || "\u00A0"}    
                            </td>
                        </tr>
                    </tbody>
                </table>

                <p className="mb-2 text-justify">
                    Dengan ini menyatakan bahwa kami mengijinkan PT BPR Bank
                    Karanganyar (Perseroda) untuk
                </p>
                <p className="mb-2 font-bold italic text-justify">
                    Melakukan Analisa SLIK (Sistem Layanan Informasi Keuangan)
                    atas data/identitas kami,
                </p>
                <p className="mb-8 text-justify">
                    Sehubungan dengan pengajuan kredit kami pada Bank tersebut.
                </p>

                <table className="mb-8 border-separate border-spacing-y-1">
                    <tbody>
                        <tr>
                            <td className="w-[15%] align-top">Atas Nama</td>
                            <td className="w-[2%] align-top">:</td>
                            <td className="uppercase font-bold garis-bawah min-w-[300px] align-top">
                                {formData.nama || "\u00A0"}
                            </td>
                        </tr>
                        <tr>
                            <td className="align-top">Pada tanggal</td>
                            <td className="align-top">:</td>
                            <td className="garis-bawah min-w-[300px] align-top">
                                {getTanggalSekarang()}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <p className="mb-8">
                    Demikian pernyataan ini kami buat untuk dapat dipergunakan
                    sebagaimana mestinya.
                </p>

                <div className="avoid-break text-center mb-4">
                    <p>Karanganyar, {getTanggalSekarang()}</p>
                    <p className="mb-2">Yang membuat pernyataan</p>
                </div>

                {/* =======================================================================
                    LOGIKA DINAMIS KOLOM TANDA TANGAN (KOTAK BAWAH)
                    ======================================================================= */}
                <table className="avoid-break w-full border-collapse border border-black h-28">
                    <tbody>
                        <tr>
                            {/* Kolom 1: Debitur/Pemohon */}
                            <td className="border border-black w-1/4 align-bottom p-2 h-28">
                                Nama:{" "}
                                <span className="uppercase garis-bawah inline-block min-w-[120px] text-center font-bold">
                                    {formData.nama || "\u00A0"}
                                </span>
                            </td>

                            {/* Kolom 2: Istri/Suami Debitur */}
                            <td className="border border-black w-1/4 align-bottom p-2 h-28">
                                Nama:{" "}
                                <span className="uppercase garis-bawah inline-block min-w-[120px] text-center font-bold">
                                    {formData.nama_pasangan || "\u00A0"}
                                </span>
                            </td>

                            {/* Kolom 3: Penjamin */}
                            <td className="border border-black w-1/4 align-bottom p-2 h-28">
                                Nama:{" "}
                                <span className="uppercase garis-bawah inline-block min-w-[120px] text-center font-bold">
                                    {formData.nama_penjamin || "\u00A0"}
                                </span>
                            </td>

                            {/* Kolom 4: Istri/Suami Penjamin */}
                            <td className="border border-black w-1/4 align-bottom p-2 h-28">
                                Nama:{" "}
                                <span className="uppercase garis-bawah inline-block min-w-[120px] text-center font-bold">
                                    {formData.nama_pasangan_penjamin || "\u00A0"}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p className="italic text-[10px] mt-1">
                    *) Coret yang tidak perlu
                    <br />
                    Pernyataan ini guna untuk Perlengkapan Pengajuan Kredit
                </p>
            </div>

            {/* =======================================================================
                HALAMAN 3: SURAT PERNYATAAN (POTONG GAJI)
                ======================================================================= */}
            <div className="page-break w-full relative pt-6 px-4">
                <h1 className="text-xl font-bold text-center mb-8 underline">
                    SURAT PERNYATAAN
                </h1>
                <p className="mb-6">Yang bertanda tangan dibawah ini :</p>

                <table className="w-full mb-6 border-separate border-spacing-y-2">
                    <tbody>
                        <tr>
                            <td className="w-[18%]">Nama</td>
                            <td className="w-[2%]">:</td>
                            <td className="uppercase garis-bawah font-bold">
                                {formData.nama || "\u00A0"}
                            </td>
                        </tr>
                        <tr>
                            <td>Alamat</td>
                            <td>:</td>
                            <td className="uppercase garis-bawah">
                                {formData.alamat || "\u00A0"}
                            </td>
                        </tr>
                        <tr>
                            <td>NIK</td>
                            <td>:</td>
                            <td className="garis-bawah">
                                {formData.nik || "\u00A0"}
                            </td>
                        </tr>
                        <tr>
                            <td>Dinas</td>
                            <td>:</td>
                            <td className="uppercase garis-bawah">
                                {instansiTerpilih?.nama_instansi || "\u00A0"}
                            </td>
                        </tr>
                        <tr>
                            <td>NIP</td>
                            <td>:</td>
                            <td className="garis-bawah">
                                {formData.nip || "\u00A0"}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <p className="mb-4">
                    Bahwa saya Nasabah PT BPR Bank Karanganyar (Perseroda)
                    dengan :
                </p>

                <table className="w-full mb-6 border-separate border-spacing-y-2">
                    <tbody>
                        <tr>
                            <td className="w-[18%]">Plafon</td>
                            <td className="w-[2%]">:</td>
                            <td>
                                Rp.{" "}
                                <span className="garis-bawah inline-block min-w-[150px] font-bold">
                                    {formData.nominal_kredit
                                        ? formatRp(String(formData.nominal_kredit).replace(/\D/g, ''))
                                        : "\u00A0"}
                                </span>{" "}
                                ,00
                            </td>
                        </tr>
                        <tr>
                            <td>Jangka Waktu</td>
                            <td>:</td>
                            <td>
                                <span className="garis-bawah inline-block min-w-[50px] text-center font-bold">
                                    {formData.tenor_kredit || "\u00A0"}
                                </span>{" "}
                                Bln /{" "}
                                <span className="garis-bawah inline-block min-w-[50px] text-center font-bold">
                                    {formData.tenor_kredit
                                        ? formData.tenor_kredit / 12
                                        : "\u00A0"}
                                </span>{" "}
                                Th
                            </td>
                        </tr>
                        <tr>
                            <td>Akad Kredit</td>
                            <td>:</td>
                            <td className="garis-bawah">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Jatuh Tempo</td>
                            <td>:</td>
                            <td className="garis-bawah">&nbsp;</td>
                        </tr>
                    </tbody>
                </table>

                <p className="mb-4 text-justify leading-loose">
                    Meminta kepada PT BPR Bank Karanganyar (Perseroda) untuk
                    memotong penghasilan saya sebagai <br />
                    <b>
                        Pegawai Pemerintah Dengan Perjanjian Kerja Sebesar
                    </b>{" "}
                    Rp.{" "}
                    <span className="garis-bawah inline-block min-w-[250px]">
                        &nbsp;
                    </span>
                    <br />({" "}
                    <span className="garis-bawah inline-block w-[95%]">
                        &nbsp;
                    </span>{" "}
                    ) <br />
                    setiap bulan sebagai angsuran Di PT BPR Bank Karanganyar
                    (Perseroda) sampai dengan lunas.
                </p>

                <p className="mb-4 text-justify leading-relaxed">
                    Dengan ini menyatakan bahwa saya adalah nasabah PT BPR Bank
                    Karanganyar (Perseroda) dan apabila saya pensiun maupun
                    keluar dari tempat/instansi/perusahaan saya bekerja, maka
                    saya bersedia menyerahkan pesangon/asuransi/atau apapun yang
                    saya terima dari tempat/instansi/perusahaan di mana saya
                    pernah bekerja kepada Bendahara Gaji untuk pelunasan
                    pinjaman saya di PT BPR Bank Karanganyar (Perseroda).
                </p>

                <p className="mb-8 text-justify leading-relaxed">
                    Dan apabila masih terdapat kekurangan dalam pelunasan
                    pinjaman saya di PT BPR Bank Karanganyar (Perseroda), maka
                    saya bersedia menyerahkan agunan sebagai pengganti
                    kekurangan pelunasan.
                    <br />
                    <br />
                    Demikian surat pernyataan ini dibuat tanpa ada paksaan dari
                    pihak manapun dan untuk dapat dipergunakan sebagaimana
                    mestinya.
                </p>

                <div className="avoid-break flex justify-end text-center mb-8 pr-12">
                    <div>
                        <p>Karanganyar, {getTanggalSekarang()}</p>
                    </div>
                </div>

                <div className="avoid-break flex justify-between text-center px-12">
                    <div className="w-1/2 flex flex-col justify-between items-center">
                        <p>Suami</p>
                        <div className="h-24"></div>
                        <p className="uppercase">
                            [{" "}
                            <span className="garis-bawah inline-block min-w-[150px] font-bold text-center">
                                {formData.jenis_kelamin === "Laki-laki"
                                    ? formData.nama
                                    : formData.nama_pasangan || "\u00A0"}
                            </span>{" "}
                            ]
                        </p>
                    </div>
                    <div className="w-1/2 flex flex-col justify-between items-center relative">
                        <p>Istri</p>
                        <div className="absolute top-10 text-[10px] italic text-center w-full">
                            Materai Rp. 10.000,-
                        </div>
                        <div className="h-24"></div>
                        <p className="uppercase">
                            [{" "}
                            <span className="garis-bawah inline-block min-w-[150px] font-bold text-center">
                                {formData.jenis_kelamin === "Perempuan"
                                    ? formData.nama
                                    : formData.nama_pasangan || "\u00A0"}
                            </span>{" "}
                            ]
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
