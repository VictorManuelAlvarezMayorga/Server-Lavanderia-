import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { IOrder } from '../orders/Interfaces';


interface OrderResumeProps {
  order: IOrder;
  total: number;
}

const OrderResume: React.FC<OrderResumeProps> = ({ order, total }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.ticket}>
        <Text style={styles.header}>TICKET DE ORDEN</Text>
        
        {/* Encabezado */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DETALLES DE LA ORDEN</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Cliente ID:</Text>
            <Text>{order.client_id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Atendido por:</Text>
            <Text>{order.user_id}</Text>
          </View>
        </View>

        {/* Detalle de prendas y servicios */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PRENDAS Y SERVICIOS</Text>
          
          {order.garments?.map((garment, gIndex) => (
            <View key={`garment-${gIndex}`} style={styles.garmentSection}>
              <Text style={styles.garmentTitle}>PRENDA #{gIndex + 1}: {garment.type}</Text>
              <Text style={styles.garmentDescription}>{garment.description}</Text>
              {garment.observations && (
                <Text style={styles.observations}>Obs: {garment.observations}</Text>
              )}

              <View style={styles.servicesContainer}>
                {garment.services.map((service, sIndex) => (
                  <View key={`service-${gIndex}-${sIndex}`} style={styles.serviceRow}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <View style={styles.serviceDetails}>
                      <Text>{service.quantity} x ${service.unitPrice}</Text>
                      <Text style={styles.serviceSubtotal}>
                        ${(service.quantity * service.unitPrice).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
              
              <View style={styles.garmentTotal}>
                <Text>Subtotal prenda:</Text>
                <Text style={styles.garmentTotalAmount}>
                  ${garment.services.reduce((sum, s) => sum + (s.quantity * s.unitPrice), 0).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>TOTAL A PAGAR:</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>

        <Text style={styles.footer}>¡Gracias por su preferencia!</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  ticket: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontWeight: '600',
  },
  garmentSection: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  garmentTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#444',
  },
  garmentDescription: {
    color: '#666',
    marginBottom: 3,
    fontStyle: 'italic',
  },
  observations: {
    color: '#888',
    fontSize: 12,
    marginBottom: 8,
  },
  servicesContainer: {
    marginTop: 8,
    marginLeft: 10,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  serviceName: {
    flex: 2,
    fontWeight: '500',
  },
  serviceDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceSubtotal: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  garmentTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  garmentTotalAmount: {
    fontWeight: 'bold',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 2,
    borderTopColor: '#333',
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#007bff',
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
    fontStyle: 'italic',
  },
});

export default OrderResume;