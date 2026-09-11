import { View } from "react-native"
import { useLocalSearchParams } from "expo-router"

import DetalleDia from "../../components/DetalleDia"
import { colors } from "../../constants/theme"

export default function DiaScreen() {
  const { fecha: fechaParam, crear } = useLocalSearchParams()
  const fecha = typeof fechaParam === "string" ? fechaParam : fechaParam?.[0] || ""

  return (
    <View style={styles.screen}>
      <DetalleDia fecha={fecha} autoOpenForm={crear === "1"} />
    </View>
  )
}

const styles = {
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
}