// AI DISABLED VERSION (SAFE FOR RENDER)

const generateTheory = async (req, res) => {
  try {
    const { path, topic, time } = req.body;

    if (!path || !topic || !time) {
      return res.status(400).json({
        message: "path, topic and time are required",
      });
    }

    return res.status(200).json({
      theory: `
This is static theory content.

AI generation is currently disabled.

You can enable OpenAI later when billing is active.
      `,
      source: "static",
    });

  } catch (error) {
    return res.status(500).json({
      error: "Theory generation failed",
      details: error.message,
    });
  }
};

module.exports = { generateTheory };