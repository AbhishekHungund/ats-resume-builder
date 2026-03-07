import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

export const exportToPdf = async (elementId, filename = 'resume.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    alert('Preview panel not found!');
    return;
  }

  try {
    // Generate high resolution canvas of the A4 preview panel
    const canvas = await html2canvas(element, {
      scale: 2, 
      useCORS: true,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    
    // Create A4 PDF (210mm x 297mm standard)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
    
  } catch (error) {
    console.error('Error exporting PDF:', error);
    alert('Failed to generate PDF. Please try again or check console logs.');
  }
};
