import sketch from 'sketch'

export default function() {

  const options =  ["Bottom to Top","Top to Bottom"]
  sketch.UI.getInputFromUser(

      "Would you like the text styles as an Array or Object",
      {
          type: sketch.UI.INPUT_TYPE.selection,
          possibleValues: options
      }, (err, value) => {
          if (err) {
            // most likely the user canceled the input
            return;
          } else {
            let reverseLayers = false;
            if(value==="Bottom to Top") reverseLayers = false;
            if(value==="Top to Bottom") reverseLayers = true;
            sequenceLayers(reverseLayers);
          }
      })

}

function sequenceLayers(reverseLayers){

  let document = sketch.getSelectedDocument();
  
  let pages = document.pages;

  let count = 1;

  pages.map(page=>{


    let layers = page.layers;
    let artboards = layers.filter( (layer) => {
      if(layer.type === 'Artboard') return layer;
    });

    if(reverseLayers) artboards.reverse();

    artboards.map(artboard=> {

      // string will have to be count length, and add 00s depemning on whether it is greater than 9 and rthen 99
      let numberString =  '00' + count
      if(count>9) {
        numberString = '0' + count
      }
      if(count>99) {
        numberString =  count
      }
      
     //match the first set of numbers (if any)
      var re = /(\d)*-/i;
      var modifiedName = artboard.name.replace(re,'');

      artboard.name =  modifiedName;
      count++;
    });


  });
}
