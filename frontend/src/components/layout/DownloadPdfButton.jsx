import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function DownloadPDFButton({ heatName }) {
  const handleDownloadPDF = async () => {
    const input = document.getElementById("heat-report");
    if (!input) {
      alert("Không tìm thấy nội dung HeatReport");
      return;
    }

    // Chụp DOM thành ảnh có độ phân giải cao
    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      windowWidth: input.scrollWidth,
      windowHeight: input.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Trang đầu
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Nếu còn nội dung thì thêm trang
    while (heightLeft > 0) {
      position -= pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(`${heatName || "heat-report"}.pdf`);
  };

  return (
    <button
      onClick={handleDownloadPDF}
      style={{
        padding: "10px 15px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "20px",
      }}
    >
      Download PDF
    </button>
  );
}
