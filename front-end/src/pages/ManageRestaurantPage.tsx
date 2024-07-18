import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import React from "react";

const ManageRestaurantPage = () => {
  return (
    <ManageRestaurantForm
      onSave={function (restaurantFormData: FormData): void {
        throw new Error("Function not implemented.");
      }}
      isLoading={false}
    />
  );
};

export default ManageRestaurantPage;
