import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {

const { data, error } = await supabase
.from('cabins')
.select('*')

    if(error) {
        console.log('cabins could not be loaded')
    }
    return data;
}
//https://qsrpcpslrrmticsafiqa.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
export async function createNewCabin(newCabin){
const imageName= `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
);
const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

const { data, error } = await supabase
.from('cabins')
.insert([{...newCabin, image: imagePath}])
//.select()
if(error) {
    console.error(error);
    throw new Error('Cabin could not be created')
}

const { error: storageError } = await supabase.storage
.from('cabin-images')
.upload(imageName, newCabin.image)

if(storageError){
    await supabase.from('cabins').delete().eq('id', data.id)
console.error(storageError);
    throw new Error('Cabin iamge could not be upload and the cabin was not created')
}
return data;
}

export async function deleteCabin(id){

const { data, error } = await supabase
.from('cabins')
.delete()
.eq('id', id);

if(error) {
    console.error(error);
    throw new Error('Cabin could not be deleted')
}
return data;

}
