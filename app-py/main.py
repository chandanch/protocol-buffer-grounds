from orderservice_pb2 import Order, Size

# from google.protobuf.timestamp_pb2 import Timestamp
from google.protobuf.json_format import MessageToJson
import datetime
import sys

order = Order()

order.order_id = 122
order.order_time.FromDatetime(datetime.datetime.now())
order.cost = 23.23
meal = order.meal["chandio"]
meal.entree.food = "Burger"
meal.entree.notes.append("Extra cheese")
meal.entree.size = Size.Size_MEDIUM
meal.drink.name = "Zero Coke"
meal.drink.size = Size.Size_SMALL
side = meal.sides.add()
side.type = "French Fries"
side.notes.append("extra sauce")
side.size = Size.Size_MEDIUM

print("Serialized message")
# convert message to binary in order to transmit over network
sys.stdout.write(str(order.SerializeToString()))

print("\n")

print("DeSerialized Message")

order2 = Order()

order2.ParseFromString(order.SerializeToString())

sys.stdout.write(MessageToJson(order2))
