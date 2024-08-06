import { Link } from "expo-router";
import {Text} from "react-native"

export default function HomeScreen() {
  return (
    <Link href="/waiter" className="text-3xl">Welcome!</Link>
  );
}
