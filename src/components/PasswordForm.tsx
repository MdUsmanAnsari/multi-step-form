import { useForm } from "react-hook-form";
import { useFormState } from "./FormContext";
import { useState } from "react";

type TFormValues = {
  password: string;
  confirmPassword: string;
};

export function PasswordForm() {
  const [isCreated, setCreated] = useState(false);
  const { setFormData, formData, onHandleBack } = useFormState();
  const { register, handleSubmit } = useForm<TFormValues>({
    defaultValues: formData,
  });

  const onHandleFormSubmit = (data: TFormValues) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setCreated(true);
  };

  return isCreated ? (
    <div>
      <p>Account created successfully</p>
      <pre>{JSON.stringify(formData)}</pre>
    </div>
  ) : (
    <form className="space-y-6" onSubmit={handleSubmit(onHandleFormSubmit)}>
      <div className="flex gap-1 flex-col">
        <label htmlFor="password">Password</label>
        <input
          autoFocus
          id="password"
          {...register("password")}
          className="border h-11 px-4 rounded-md focus:outline-blue-500 "
          type="password"
          required={true}
        />
      </div>

      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={onHandleBack}
          className="h-11 px-6 inline-block bg-blue-600 font-semibold text-white rounded-md"
        >
          Back
        </button>
        <button className="h-11 px-6 inline-block bg-blue-600 font-semibold text-white rounded-md">
          Create
        </button>
      </div>
    </form>
  );
}
