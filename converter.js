
const factors = {
    // Length
    'mm': 0.001,
    'cm': 0.01,
    'm': 1,
    'km': 1000,
    'in': 0.0254,
    'ft': 0.3048,
    'yd': 0.9144,
    'mi': 1609.34,
    
    // Weight
    'mg': 0.001,
    'g': 1,
    'kg': 1000,
    'oz': 28.3495,
    'lb': 453.592
};

export function convert(value, fromUnit, toUnit) {
    if (!factors[fromUnit] || !factors[toUnit]) {
        throw new Error('Unsupported unit');
    }
    
    const valueInBase = value * factors[fromUnit];
    return valueInBase / factors[toUnit];
}


export function convertTemperature(value, fromUnit, toUnit) {

    if (fromUnit === toUnit) return value;
    
    if (fromUnit === 'C') {    
        if (toUnit === 'F') return value * 9/5 + 32;
        if (toUnit === 'K') return value + 273.15;
    }
    
    if (fromUnit === 'F') {
        if (toUnit === 'C') return (value - 32) * 5/9;
        if (toUnit === 'K') return (value - 32) * 5/9 + 273.15;
    }
    
    if (fromUnit === 'K') {
        if (toUnit === 'C') return value - 273.15;
        if (toUnit === 'F') return (value - 273.15) * 9/5 + 32;
    }
    
    throw new Error('Unsupported temperature unit');
}