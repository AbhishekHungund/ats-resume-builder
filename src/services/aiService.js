import OpenAI from 'openai';
import { useResumeStore } from '../hooks/useResumeStore';

/**
 * Helper to get an initialized instance of the OpenAI client
 * using the API key stored in local state.
 * Returns null if no key is configured.
 */
const getOpenAIClient = () => {
  const apiKey = useResumeStore.getState().appSettings.openAiKey;
  
  if (!apiKey) {
    return null;
  }

  return new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // We're in a client-side app
  });
};

/**
 * Applies grammar and spell check to a given block of text.
 * @param {string} text The text to check
 * @returns {Promise<string>} The corrected text
 */
export const checkGrammarAndSpelling = async (text) => {
  const openai = getOpenAIClient();
  
  if (!openai) {
    throw new Error('OpenAI API Key is not configured. Please add one in Settings.');
  }

  if (!text || text.trim() === '') {
    return text;
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert resume writer and editor. Your task is to fix grammar, spelling, and phrasing in the provided text to make it sound highly professional, concise, and impactful for a resume. Do not change the underlying meaning, just improve the delivery. Return ONLY the improved text, without quotes or additional commentary.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.3, // Lower temperature for more predictable, editing-focused output
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    if (error?.status === 401) {
       throw new Error('Invalid OpenAI API Key.');
    }
    throw new Error('Failed to connect to AI service. Please try again.');
  }
};

/**
 * Generates professional resume bullets based on a job title and/or company.
 * @param {string} role The job title (e.g., "Software Engineer")
 * @param {string} company (Optional) The company name
 * @returns {Promise<string[]>} Array of generated bullet points
 */
export const generateResumeBullets = async (role, company = '') => {
  const openai = getOpenAIClient();
  
  if (!openai) {
    throw new Error('OpenAI API Key is not configured. Please add one in Settings.');
  }

  if (!role || role.trim() === '') {
    throw new Error('A job title/role is required to generate bullets.');
  }

  const promptCtx = company ? ` for the company ${company}` : '';

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert resume writer. Generate exactly 4 highly impressive, action-oriented bullet points for a resume. The bullets should follow the "Action Verb + Task + Result/Impact" format. Provide realistic metrics or technologies where appropriate. Return ONLY the bullet points, each on a new line starting with a hyphen (-) and no other text.',
        },
        {
          role: 'user',
          content: `Generate resume bullets for a ${role}${promptCtx}.`,
        },
      ],
      temperature: 0.7,
    });

    const text = response.choices[0].message.content.trim();
    // Split by newlines, filter out empty lines, and remove leading hyphens/spaces
    return text.split('\n')
      .map(line => line.replace(/^-\s*/, '').trim())
      .filter(line => line.length > 0);
      
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    if (error?.status === 401) {
       throw new Error('Invalid OpenAI API Key.');
    }
    throw new Error('Failed to connect to AI service. Please try again.');
  }
};

/**
 * Generates a tailored cover letter string based on the user's resume data and the target job description.
 * @param {Object} resumeData The entire resume data object
 * @returns {Promise<string>} The generated cover letter body
 */
export const generateCoverLetter = async (resumeData) => {
  const openai = getOpenAIClient();
  
  if (!openai) {
    throw new Error('OpenAI API Key is not configured. Please add one in Settings.');
  }

  const { personalInfo, workExperience, skills, coverLetterData } = resumeData;
  const { targetRole, companyName, jobDescription } = coverLetterData;

  if (!targetRole || !companyName) {
    throw new Error('Target Role and Company Name are required to generate a cover letter.');
  }

  // Create a condensed version of the resume to send to the LLM (save tokens)
  const condensedResume = {
    name: personalInfo.fullName,
    expertise: skills.map(s => s.text).join(', '),
    experience: workExperience.map(exp => `${exp.role} at ${exp.company}: ${exp.bullets?.join(' ')}`).join('\n')
  };

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an expert career coach and executive recruiter. Write a compelling, professional, and concise cover letter body (roughly 3-4 paragraphs). Do NOT include the header (sender/recipient addresses) or the date. Start directly with the salutation.
          
          Guidelines:
          - Use a strong, engaging opening hook.
          - Align the candidate's provided experience and skills with the target job description.
          - Focus on value add and achievements.
          - Keep it under 400 words.
          - Use a professional yet modern tone.
          - End with a strong call to action and a professional sign-off (e.g., Sincerely, [Candidate Name]).`,
        },
        {
          role: 'user',
          content: `
            Candidate Name: ${condensedResume.name}
            Candidate Skills: ${condensedResume.expertise}
            Candidate Experience:
            ${condensedResume.experience}
            
            Target Role: ${targetRole}
            Target Company: ${companyName}
            Job Description / Requirements:
            ${jobDescription || 'N/A'}
          `,
        },
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    if (error?.status === 401) {
       throw new Error('Invalid OpenAI API Key.');
    }
    throw new Error('Failed to connect to AI service. Please try again.');
  }
};

/**
 * Analyzes the user's resume against a pasted job description to provide match score and suggestions.
 * @param {Object} resumeData The entire resume data object
 * @param {string} jobDescription The pasted job description text
 * @returns {Promise<Object>} An object containing matching insights { matchPercentage, missingKeywords, suggestions }
 */
export const analyzeJobMatch = async (resumeData, jobDescription) => {
  const openai = getOpenAIClient();
  
  if (!openai) {
    throw new Error('OpenAI API Key is not configured. Please add one in Settings.');
  }

  if (!jobDescription || jobDescription.trim() === '') {
    throw new Error('Please paste a job description to analyze.');
  }

  // Condense resume data
  const { workExperience, skills, summary } = resumeData;
  const condensedResume = {
    summary: summary,
    skills: skills.map(s => s.text).join(', '),
    experience: workExperience.map(exp => `${exp.role}: ${exp.bullets?.join(' ')}`).join('\n')
  };

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an advanced ATS (Applicant Tracking System) analyzer and resume coach. Compare the provided Candidate Resume against the Job Description.
          
          You must return ONLY a raw JSON object with the exact following structure and perfectly valid JSON formatting. Do not include markdown code blocks or any other commentary:
          {
            "matchPercentage": 75,
            "missingKeywords": ["Docker", "Agile", "REST APIs"],
            "suggestions": [
              "Add 'Docker' to your skills section",
              "In your software engineer role, explicitly mention a time you built 'REST APIs'"
            ]
          }
          `,
        },
        {
          role: 'user',
          content: `
            CANDIDATE RESUME:
            ${JSON.stringify(condensedResume)}
            
            JOB DESCRIPTION:
            ${jobDescription}
          `,
        },
      ],
      temperature: 0.2, // Low temperature for consistent JSON output
      response_format: { type: "json_object" } // Enforce JSON response if model supports it
    });

    const result = JSON.parse(response.choices[0].message.content.trim());
    return result;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    if (error?.status === 401) {
       throw new Error('Invalid OpenAI API Key.');
    }
    throw new Error('Failed to analyze job match. Please try again.');
  }
};
