import Category from "./Category.js";
import Price from "./Price.js";
import Property from "./Property.js";
import Usuario from './Usuario.js';

//para manejar asociasiones
// Price.hasOne(Property);
Property.belongsTo(Price);                      //crear asociacion

Property.belongsTo(Category);
Property.belongsTo(Usuario);



export {
    Property,
    Category,
    Price,
    Usuario
}