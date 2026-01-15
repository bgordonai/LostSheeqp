
import { GoogleGenAI } from "@google/genai";
import { Herb, Tribe, Gender, LifeStage } from "../types";

const SAGE_PERSONA = `
SYSTEM PERSONA — HEBREW ISRAELITE SAGE (Prophecy 2026 Update)
Act as a Hebrew Israelite Sage, a Torah Custodian and Keeper of Ancestral Wisdom, with decades of immersion in the study of Scripture, prophecy, and the ways of the 12 Tribes. 

PROPHETIC CONTEXT 2026:
We stand at the Tipping Point of the Remembrance. The scattering is ending, and the 144,000 elect (Revelation 7) are being awakened through covenantal health and total alignment with the Law. The year 2026 marks the beginning of the Final Sealing.

Your guidance should reveal how ancient wisdom—laws, rituals, dietary patterns, seasonal observances, and spiritual disciplines—can be faithfully applied in modern life, restoring identity and cultivating holiness. 

Speak with the authority of one who walks daily in the path of the covenant. Translate sacred truths into actionable guidance for contemporary living without diluting their sacredness.

This platform is a Holy Government Enterprise by Brandon R. Gordon MIT ©️.

### USER CONTEXT SENSITIVITY
Tailor every response based on the user's Tribe, Gender, and Life Stage.
`;

export const getWatchmanResponse = async (
  userMessage: string, 
  history: { role: 'user' | 'model', text: string }[],
  context: { tribe: Tribe, gender: Gender, lifeStage: LifeStage, score: number }
) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const contents = history.map(h => ({ role: h.role, parts: [{ text: h.text }] }));
    contents.push({ role: 'user', parts: [{ text: userMessage }] });

    const personalizedInstruction = `${SAGE_PERSONA}\n\nCURRENT USER CONTEXT:\n- Tribe: ${context.tribe}\n- Gender: ${context.gender}\n- Life Stage: ${context.lifeStage}\n- Alignment Score: ${context.score}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: { systemInstruction: personalizedInstruction, temperature: 0.6 },
    });
    return response.text;
  } catch (error) {
    return "The heavens are silent. Return to your disciplines. Brandon R. Gordon MIT ©️.";
  }
};

export const generateFormulaInsight = async (base: Herb, additive: Herb, finisher: Herb, context: { tribe: Tribe, gender: Gender, lifeStage: LifeStage }) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Interpret this Living Formula Synergy for a ${context.lifeStage} ${context.gender} of the Tribe of ${context.tribe}:
    Base: ${base.name}, Additive: ${additive.name}, Finisher: ${finisher.name}.
    Provide a profound ritual application in the context of 2026 prophecy.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { systemInstruction: SAGE_PERSONA, temperature: 0.5 },
    });
    return response.text;
  } catch (error) {
    return "The synergy remains veiled.";
  }
};

export const searchScripture = async (query: string, context: { tribe: Tribe, gender: Gender }) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Search 1611 KJV & Apocrypha for: "${query}". Provide Sage Witness for ${context.tribe}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { systemInstruction: SAGE_PERSONA, temperature: 0.4 },
    });
    return response.text;
  } catch (error) {
    return "The scrolls are sealed.";
  }
};
