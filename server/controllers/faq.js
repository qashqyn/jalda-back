import FAQ from '../models/faq.js';

export const getFaqs = async (req, res) => {
    try {
        const faqs = await FAQ.find();

        res.status(200).json(faqs);
    } catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
}