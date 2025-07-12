import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IOrder, IService } from '../orders/Interfaces';
import constants from "../orders/Contants";
import OrderResume from '../orders/OrderResume';

const { services, garments } = constants;

const CreateOrder = () => {
  const defaultGarment = {
    type: "Camisa",
    description: "",
    observations: "",
    services: [services[0]],
  };

  const [order, setOrder] = useState<IOrder>({
    client_id: 0, user_id: 0, state: "recibido",
    total: 0, pagado: false, garments: [defaultGarment]
  });
  const [total, setTotal] = useState(0);
  const [showResume, setShowResume] = useState(false);

  const calculateTotal = () => setTotal(
    order.garments?.reduce((sum, g) => sum + 
      g.services.reduce((s, {quantity, unitPrice}) => s + quantity * unitPrice, 0), 0) || 0
  );

  const updateOrder = (updater: (data: IOrder) => void) => {
    const data = {...order};
    updater(data);
    setOrder(data);
  };

  const handleGarmentChange = (key: keyof typeof defaultGarment, value: string, index: number) => 
    updateOrder(data => {
        if (data.garments && key !== 'services') {
            data.garments[index][key] = value;
        }
    });

  const handleServiceChange = (key: keyof IService, value: string, gIdx: number, sIdx: number) =>
    updateOrder(data => {
      if (!data.garments) return;
      const val = key === 'name' ? value : Number(value);
      data.garments[gIdx].services[sIdx][key] = val as never;
    });

  const addItem = (type: 'garment' | 'service', index?: number) => 
    updateOrder(data => {
      if (type === 'garment') data.garments?.push({...defaultGarment});
      else if (index !== undefined) data.garments?.[index].services.push({...services[0]});
    });

  const deleteItem = (type: 'garment' | 'service', gIdx: number, sIdx?: number) =>
    updateOrder(data => {
      if (type === 'garment') data.garments = data.garments?.filter((_, i) => i !== gIdx);
      else if (sIdx !== undefined) {
        data.garments![gIdx].services = data.garments![gIdx].services.filter((_, i) => i !== sIdx);
      }
    });

  const renderService = (service: IService, sIdx: number, gIdx: number) => (
    <View key={sIdx} style={styles.serviceContainer}>
      {sIdx > 0 && (
        <TouchableOpacity style={styles.closeButton} onPress={() => deleteItem('service', gIdx, sIdx)}>
          <Icon name="times" size={20} color="red" />
        </TouchableOpacity>
      )}
      <View style={styles.picker}>
        {services.map((s, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.pickerItem, service.name === s.name && styles.pickerItemSelected]}
            onPress={() => handleServiceChange('name', s.name, gIdx, sIdx)}
          >
            <Text>{s.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text>Nombre: {service.name}</Text>
      <Text>Cantidad:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        defaultValue={service.quantity.toString()}
        onChangeText={v => handleServiceChange('quantity', v, gIdx, sIdx)}
      />
      <Text>Precio:</Text>
      {["Lavado", "Planchado"].includes(service.name) ? (
        <Text>{service.unitPrice}</Text>
      ) : (
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          defaultValue={service.unitPrice.toString()}
          onChangeText={v => handleServiceChange('unitPrice', v, gIdx, sIdx)}
        />
      )}
    </View>
  );

  const renderGarment = (garment: typeof defaultGarment, gIdx: number) => (
    <View key={gIdx} style={styles.garmentContainer}>
      <View style={styles.divider} />
      {gIdx > 0 && (
        <View style={styles.deleteButtonContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem('garment', gIdx)}>
            <Icon name="trash" size={20} color="white" />
            <Text style={styles.deleteButtonText}>Eliminar prenda</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>#{gIdx + 1}</Text>
          <Text style={styles.label}>Tipo de prenda:</Text>
          <View style={styles.picker}>
            {garments.map((g, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.pickerItem, garment.type === g && styles.pickerItemSelected]}
                onPress={() => handleGarmentChange('type', g, gIdx)}
              >
                <Text>{g}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.label}>Descripción:</Text>
          <TextInput
            style={styles.input}
            defaultValue={garment.description}
            onChangeText={v => handleGarmentChange('description', v, gIdx)}
          />
          <Text style={styles.label}>Observaciones:</Text>
          <TextInput
            style={styles.input}
            defaultValue={garment.observations}
            onChangeText={v => handleGarmentChange('observations', v, gIdx)}
          />
        </View>
        <View style={styles.column}>
          <Text style={styles.sectionTitle}>Servicios:</Text>
          {garment.services.map((s, sIdx) => renderService(s, sIdx, gIdx))}
          <TouchableOpacity 
            style={styles.addServiceButton} 
            onPress={() => addItem('service', gIdx)}
          >
            <Text style={styles.buttonText}>Agregar Servicio</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {showResume ? (
        <OrderResume order={order} total={total} />
      ) : (
        <>
          <View style={styles.card}>
            <Text style={styles.title}>Creación de Orden</Text>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.addButton} onPress={() => addItem('garment')}>
              <Text style={styles.buttonText}>Agregar Prenda</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Prendas:</Text>
            {order.garments?.map(renderGarment)}
            <Text style={styles.totalText}>Total: {total}</Text>
            <TouchableOpacity 
              style={styles.summaryButton} 
              onPress={() => {
                calculateTotal();
                setShowResume(true);
              }}
            >
              <Text style={styles.buttonText}>Resumen</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: 'white', borderRadius: 10, padding: 20, elevation: 3 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  divider: { height: 1, backgroundColor: '#ddd', marginVertical: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -10 },
  column: { flex: 1, paddingHorizontal: 10, minWidth: 300 },
  garmentContainer: { marginBottom: 20 },
  serviceContainer: { borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 10, marginBottom: 10 },
  formGroup: { marginBottom: 15 },
  label: { marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 10, backgroundColor: '#fff' },
  picker: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  pickerItem: { padding: 8, marginRight: 5, marginBottom: 5, borderWidth: 1, borderColor: '#ddd', borderRadius: 5 },
  pickerItemSelected: { backgroundColor: '#007bff', borderColor: '#007bff' },
  addButton: { backgroundColor: '#007bff', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  addServiceButton: { backgroundColor: '#28a745', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  summaryButton: { backgroundColor: '#17a2b8', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 20 },
  deleteButtonContainer: { alignItems: 'flex-end', marginBottom: 10 },
  deleteButton: { backgroundColor: '#dc3545', padding: 8, borderRadius: 5, flexDirection: 'row', alignItems: 'center' },
  deleteButtonText: { color: 'white', marginLeft: 5 },
  buttonText: { color: 'white', fontWeight: 'bold' },
  closeButton: { alignSelf: 'flex-end' },
  totalText: { fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center' },
});

export default CreateOrder;