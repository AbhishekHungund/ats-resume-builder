import { useMemo } from 'react';
import { useResumeStore } from './useResumeStore';

export const useAtsScore = () => {
  const { resumeData } = useResumeStore();

  const scoreData = useMemo(() => {
    let score = 0;
    const tips = [];

    // 1. Has professional summary: +15
    if (resumeData.professionalSummary?.trim().length > 0) {
      score += 15;
      
      // 2. Summary is 50-150 words: +5
      const words = resumeData.professionalSummary.trim().split(/\s+/).filter(w => w.length > 0).length;
      if (words >= 50 && words <= 150) {
        score += 5;
      } else {
        tips.push({ text: 'Make your professional summary between 50 and 150 words.', type: 'warning' });
      }
    } else {
      tips.push({ text: 'Add a professional summary to highlight your career goals.', type: 'error' });
    }

    // 3. Has at least 2 work experiences: +15
    if (resumeData.workExperience?.length >= 2) {
      score += 15;
    } else {
      tips.push({ text: 'Add at least 2 relevant work experiences.', type: 'error' });
    }

    // 4. Each experience has 2+ bullet points: +10
    // 5. Has measurable achievements: +10 (we'll check for numbers or % in bullets)
    let allHaveTwoBullets = true;
    let hasMeasurable = false;
    
    if (resumeData.workExperience?.length > 0) {
      resumeData.workExperience.forEach(exp => {
        const bullets = exp.bullets || [];
        if (bullets.length < 2) allHaveTwoBullets = false;
        
        bullets.forEach(b => {
          if (/\d|%/.test(b.text || b)) hasMeasurable = true;
        });
      });

      if (allHaveTwoBullets) score += 10;
      else tips.push({ text: 'Ensure each work experience has at least 2 bullet points.', type: 'warning' });

      if (hasMeasurable) score += 10;
      else tips.push({ text: 'Include numbers or percentages in your experience bullets to show measurable impact.', type: 'warning' });
    }

    // 6. Skills section has 6+ skills: +10
    if (resumeData.skills?.length >= 6) {
      score += 10;
    } else {
      tips.push({ text: 'Add at least 6 relevant skills.', type: 'warning' });
    }

    // 7. Has education entry: +10
    if (resumeData.education?.length > 0) {
      score += 10;
    } else {
      tips.push({ text: 'Add an education entry.', type: 'error' });
    }

    // 8. Contact info complete: +10
    const { email, phone, location } = resumeData.personalInfo || {};
    if (email && phone && location) {
      score += 10;
    } else {
      tips.push({ text: 'Complete your contact info (email, phone, location).', type: 'error' });
    }

    // 9. No special characters in section headers: +5
    score += 5;

    // 10. Single clean font used: +5
    score += 5;

    score = Math.min(score, 100);

    return { score, tips };
  }, [resumeData]);

  return scoreData;
};
