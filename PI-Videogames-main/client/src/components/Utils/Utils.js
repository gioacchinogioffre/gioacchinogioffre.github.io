
module.exports = {
  validate: validate



}


 function validate(game) {
    let errors = {}; 
    if (!game.name) {errors.name = 'name is required'} 
    else if (!/\S+@\S+\.\S+/.test(game.name)) {errors.name = 'name is invalid'} 
    else if (!game.description) {errors.description = 'description is required'} 
    else if (!/(?=.*[0-9])/.test(game.description)) {errors.description = 'description is invalid'} 
    return errors; 
  }

