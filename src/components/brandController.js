import BrandService from '../services/brandService';

const createBrand = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Missing data input',
            });
        }
        const response = await BrandService.createBrand(data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'Create Brand error',
        });
    }
};

const getBrand = async (req, res) => {
    try {
        const response = await BrandService.getBrand();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'Get Brand error',
        });
    }
};

const updateBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await BrandService.updateBrand(id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'update Brand error',
        });
    }
};

const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await BrandService.deleteBrand(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'delete Brand error',
        });
    }
};

module.exports = {
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand,
};
