import Creation from "../models/Creation.js";

export const getUserCreations = async (req, res) => {
    try {
        const { userId } = req.auth();

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const creations = await Creation.find({ userId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: creations,
        });

    } catch (error) {
        console.error("❌ Get User Creations Error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getPublishCreations = async (req, res) => {
    try {
        const { userId } = req.auth();

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const creations = await Creation.find({ publish: true })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: creations,
        });

    } catch (error) {
        console.error("❌ Get Published Creations Error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
