import { useNavigate } from 'react-router-dom';

const Button = () => {
    const navigate = useNavigate();

    return (
        // Кнопка "Back to shopping"
        <div className="text-center mb-8">
            <a
                onClick={() => navigate(-1)}
                className="text-green-600 cursor-pointer hover:underline"
            >
                &larr; Back to shopping
            </a>
        </div>
    );
};

export default Button;