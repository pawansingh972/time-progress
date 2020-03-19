let ColorsUtils = {};

ColorsUtils.generateRandomGradientOfType = (uid, type) => {
    let n, color_1, color_1_, color_2;
    if (typeof tinycolor !== "undefined") {
        n = uid ? Utils.hash(uid) : Utils.getRandomNumber(15);
        color_1 = tinycolor({h: n % 360, s: 0.95, l: 0.5});
        color_1_ = color_1.toHexString();
        color_2 = color_1.triad()[1].toHexString();
    } else {
        color_1 = color_1_ = ColorsUtils.generateRandomHexColor();
        color_2 = ColorsUtils.generateRandomHexColor();
    }
    
    switch (type) {
        case 'diagonal':
            return `linear-gradient(to top right, ${color_1_}, ${color_2})`;
            break;
        case 'radial':
            return `radial-gradient(circle, ${color_1_}, ${color_2})`;
            break;
        case 'horizontal':
            return `radial-gradient(${color_1_}, ${color_2})`;
            break;
        case 'vertical':
            return `radial-gradient(to right, ${color_1_}, ${color_2})`;
            break;
        default:
            return `linear-gradient(to top right, ${color_1_}, ${color_2})`;
    }
}


ColorsUtils.generateRandomGradients = () => {
    let gradientTypes = ['diagonal', 'radial', 'horizontal', 'vertical'];
    let randomGradientType = Math.round( Math.random() * gradientTypes.length );

    return ColorsUtils.generateRandomGradientOfType(randomGradientType);
}


ColorsUtils.generateRandomHexColor = () => {
    let hexValues = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e"];
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += hexValues[Math.round( Math.random() * 14 ) ];
    }
    return color;
}