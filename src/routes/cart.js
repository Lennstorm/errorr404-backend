import { Router } from "express";
import { getProductById } from "../services/product.js";

const router = Router();
export let cart = [];

const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
};


router.get('/', (req, res, next) => {
    if (cart.length === 0) {
        return res.status(404).json({
            success: false,
            status: 404,
            message: 'Din varukorg är tom'
        });
    }

    const totalPrice = calculateTotalPrice();

    res.status(200).json({
        success: true,
        status: 200,
        data: { 
            cart,
            totalPrice 
        }
    });
});

router.post('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    try {
        const foundItem = await getProductById(id);

        if (!foundItem) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: 'Produkten du försöker lägga till existerar inte.'
            });
        }

        cart.push(foundItem);

        const totalPrice = calculateTotalPrice();

        res.status(200).json({
            success: true,
            status: 200,
            message: 'Produkt tillagd i varukorgen',
            data: { 
                cart,
                totalPrice 
            }
        });
    } catch (error) {
        next(error);
    }
});


router.delete('/:id', (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const foundItemIndex = cart.findIndex(item => item.id === id);

    if (foundItemIndex === -1) {
        return res.status(404).json({
            success: false,
            status: 404,
            message: 'Produkten du försöker ta bort finns inte i varukorgen'
        });
    }

    cart.splice(foundItemIndex, 1);

    const totalPrice = calculateTotalPrice();

    res.status(200).json({
        success: true,
        status: 200,
        message: 'Produkt borttagen från varukorgen',
        data: { 
            cart,
            totalPrice 
        }
    });
});

export default router;


// ANVÄNDNING

// POST http://localhost:3000/cart/1-5 (1-5 beroende på önskad vara) för att lägga till i varukorg.
// DELETE http://localhost:3000/cart/1-5 för att ta bort från varukorg
// GET http://localhost:3000/cart för att se hela varukorgen