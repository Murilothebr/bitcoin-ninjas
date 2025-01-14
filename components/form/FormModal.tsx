import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import FormInput from "./FormInput";
import FormButtonCreate from "./FormButtonCreate";
import AppMultiSelect from "./AppMultiSelect";
import addStore from "@/services/hooks/addStore";

interface FormModalProps {
  currentStore?: Store;
  modalVisible: boolean;
  onClose: () => void;
}

const currenciesOptions = [
  { label: "Bitcoin Onchain", value: "Bitcoin Onchain" },
  { label: "Bitcoin LN", value: "Bitcoin LN" },
  { label: "Ethereum", value: "Ethereum" },
  { label: "Monero", value: "Monero" },
];

const storeSchema = z.object({
  name: z.string().min(1, "Nome da loja é obrigatório."),
  location: z.string().min(1, "Cidade é obrigatória."),
  contact: z.string().min(1, "Contato é obrigatório."),
  city: z.string().min(1, "Cidade é obrigatório."),
  segment: z.string().min(1, "Seguimento é obrigatório."),
  currencies: z
    .array(z.string())
    .nonempty("Selecione pelo menos uma moeda aceita."),
});

const FormModal: React.FC<FormModalProps> = ({ currentStore, onClose }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Store>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      id: currentStore?.id || null,
      name: currentStore?.name || "",
      city: currentStore?.city || "",
      location: currentStore?.location || "",
      contact: currentStore?.contact || "",
      description: currentStore?.description || "",
      segment: currentStore?.segment || "",
      currencies: currentStore?.currencies || [],
    },
  });

  useEffect(() => {
    if (currentStore) {
      reset({
        id: currentStore.id || null,
        name: currentStore.name || "",
        city: currentStore.city || "",
        location: currentStore.location || "",
        contact: currentStore.contact || "",
        description: currentStore.description || "",
        segment: currentStore?.segment || "",
        currencies: currentStore.currencies || [],
      });
    }
  }, [currentStore, reset]);

  const onSubmit = async (data: Store) => {
    try {
      await addStore(data);
      reset();
      onClose();
    } catch (error) {
      console.error("Failed to save store:", error);
    }
  };

  return (
    <View style={styles.modalView}>
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormInput
            label="Nome da loja"
            value={value}
            onChangeText={onChange}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        name="city"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormInput
            label="Cidade"
            value={value}
            onChangeText={onChange}
            error={errors.city?.message}
          />
        )}
      />

      <Controller
        name="location"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormInput
            label="localização"
            value={value}
            onChangeText={onChange}
            error={errors.location?.message}
          />
        )}
      />

      <Controller
        name="contact"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormInput
            label="Contato"
            value={value}
            onChangeText={onChange}
            error={errors.contact?.message}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormInput
            label="Descrição"
            value={value}
            onChangeText={onChange}
            error={errors.description?.message}
          />
        )}
      />

      <Controller
        name="currencies"
        control={control}
        render={({ field: { onChange, value } }) => (
          <AppMultiSelect
            label="Moedas aceitas"
            options={currenciesOptions}
            selectedValues={value ?? []}
            onValueChange={onChange}
            error={errors.currencies?.message}
          />
        )}
      />

      <View style={styles.buttonContainer}>
        <FormButtonCreate
          title={"Adicionar loja"}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  buttonContainer: {
    marginTop: 15,
    width: "80%",
  },
});

export default FormModal;
