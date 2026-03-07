import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, convertInchesToTwip } from 'docx';

export const exportToDocx = async (resumeData, filename = 'resume.docx') => {
  const { personalInfo, professionalSummary, workExperience, education, skills, projects, certifications } = resumeData;

  const children = [];

  // 1. Header (Name & Contact)
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: personalInfo.fullName?.toUpperCase() || 'YOUR NAME', bold: true, size: 36 }),
      ],
      spacing: { after: 120 }
    })
  );

  if (personalInfo.jobTitle) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: personalInfo.jobTitle, size: 24, bold: true })],
        spacing: { after: 120 }
      })
    );
  }

  const contacts = [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedinUrl, personalInfo.portfolioUrl].filter(Boolean);
  if (contacts.length > 0) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: contacts.join(' • '), size: 20 })],
        spacing: { after: 300 }
      })
    );
  }

  const addSectionHeading = (title) => {
    children.push(
      new Paragraph({
        text: title.toUpperCase(),
        heading: HeadingLevel.HEADING_2,
        border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } },
        spacing: { before: 300, after: 150 }
      })
    );
  };

  // 2. Summary
  if (professionalSummary?.trim()) {
    addSectionHeading('Professional Summary');
    children.push(
      new Paragraph({
        children: [new TextRun({ text: professionalSummary, size: 22 })],
        spacing: { after: 120 }
      })
    );
  }

  // 3. Work Experience
  if (workExperience?.length > 0 && workExperience.some(e => e.role || e.company)) {
    addSectionHeading('Work Experience');
    workExperience.forEach(exp => {
      if (!exp.role && !exp.company) return;
      
      children.push(
        new Paragraph({
          tabStops: [{ type: "right", position: convertInchesToTwip(6.5) }],
          children: [
            new TextRun({ text: exp.role || '', bold: true, size: 24 }),
            new TextRun({ text: exp.company ? `, ${exp.company}` : '', bold: true, size: 24 }),
            new TextRun({ text: `\t${exp.startDate || ''} ${exp.startDate && exp.endDate ? '–' : ''} ${exp.endDate || ''} ${exp.location ? `| ${exp.location}` : ''}`, size: 20 })
          ],
          spacing: { before: 120, after: 80 }
        })
      );

      if (exp.bullets?.length > 0) {
        exp.bullets.forEach(bullet => {
          if (bullet.trim()) {
            children.push(
              new Paragraph({
                bullet: { level: 0 },
                children: [new TextRun({ text: bullet, size: 22 })],
                spacing: { before: 40, after: 40 }
              })
            );
          }
        });
      }
    });
  }

  // 4. Education
  if (education?.length > 0 && education.some(e => e.institution || e.degree)) {
    addSectionHeading('Education');
    education.forEach(edu => {
      children.push(
        new Paragraph({
          tabStops: [{ type: "right", position: convertInchesToTwip(6.5) }],
          children: [
            new TextRun({ text: edu.institution || '', bold: true, size: 24 }),
            new TextRun({ text: edu.degree || edu.field ? ` — ${edu.degree || ''} ${edu.field ? `in ${edu.field}` : ''}` : '', size: 24 }),
            new TextRun({ text: `\t${edu.graduationYear || ''} ${edu.gpa ? `| GPA: ${edu.gpa}` : ''}`, size: 20 })
          ],
          spacing: { before: 120, after: 80 }
        })
      );
    });
  }

  // 5. Projects
  if (projects?.length > 0 && projects.some(p => p.title)) {
    addSectionHeading('Projects');
    projects.forEach(proj => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: proj.title || '', bold: true, size: 24 }),
            new TextRun({ text: proj.techStack ? ` | ${proj.techStack}` : '', italics: true, size: 22 }),
            new TextRun({ text: proj.link ? ` | ${proj.link}` : '', size: 20 })
          ],
          spacing: { before: 120, after: 80 }
        })
      );
      if (proj.description) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: proj.description, size: 22 })],
            spacing: { after: 80 }
          })
        );
      }
    });
  }

  // 6. Skills
  if (skills?.length > 0) {
    addSectionHeading('Skills');
    ['Technical', 'Soft', 'Tools'].forEach(cat => {
      const catSkills = skills.filter(s => s.category === cat);
      if (catSkills.length > 0) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${cat}: `, bold: true, size: 22 }),
              new TextRun({ text: catSkills.map(s => s.text).join(', '), size: 22 })
            ],
            spacing: { before: 60, after: 60 }
          })
        );
      }
    });
  }

  // 7. Certifications
  if (certifications?.length > 0 && certifications.some(c => c.name)) {
    addSectionHeading('Certifications');
    certifications.filter(c => c.name).forEach(cert => {
      children.push(
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: cert.name, bold: true, size: 22 }),
            new TextRun({ text: cert.issuer ? ` — ${cert.issuer}` : '', size: 22 }),
            new TextRun({ text: cert.year ? ` (${cert.year})` : '', size: 22 })
          ],
          spacing: { before: 60, after: 60 }
        })
      );
    });
  }

  const doc = new Document({
    sections: [{
      properties: {},
      children: children
    }]
  });

  try {
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting DOCX:', error);
    alert('Failed to generate DOCX. Please try again.');
  }
};
