import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { createNewCabin } from "../../services/apiCabins";
import { useForm } from "react-hook-form";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createNewCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (error) => toast.error(error.message),
  });


  function onSubmit(data) {
    console.log("working", data.image[0])
    mutate({...data, image: data.image?.[0] || null});
  }
  function onError(errors) {
    //console.log(errors)
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input type="text" id="name" disabled={isCreating} {...register(
          'name', {
          required: 'This field is required',
        }
        )} />
      </FormRow>
      <FormRow label='Maximun Capacity' error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isCreating} {...register(
          'maxCapacity', {
          required: 'This field is required',
          min: {
            value: 1,
            message: 'Capacity should be at least 1'
          }
        }
        )} />
      </FormRow>

      <FormRow label='Regular Price' error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isCreating} {...register(
          'regularPrice', {
          required: 'This field is required',
          min: {
            value: 1,
            message: 'Capacity should be at least 1',
          }
        }
        )} />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input type="number" id="discount" disabled={isCreating} defaultValue={0} {...register(
          'discount', {
          required: 'This field is required',
          validate: (value) => value <= getValues().regularPrice ||
            'Discount should be less than regular price',
        }
        )} />
      </FormRow>

      <FormRow label='Description' error={errors?.description?.message} disabled={isCreating}>
        <Textarea type="number" id="description" defaultValue="" disabled={isCreating} {...register(
          'description', {
          required: 'This field is required',
        }
        )} />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput id='image' accept='image/*' 
        type="file" {...register('image',
          {
            require:'This field is require',
          }
        )} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add Cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
