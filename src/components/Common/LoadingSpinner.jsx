function LoadingSpinner({ size = 'medium', message = '' }){
    const sizeClass = {
        small: 'spinner-small',
        medium: 'spinner-medium',
        large: 'spinner-large'
    };

    return (
        <div className="loading-container">
            <div className={`loading-spinner ${sizeClass[size]}`}></div>
            {message && <p className="loading-message">{message}</p>}
        </div>
    );
}

export default LoadingSpinner;