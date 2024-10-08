import mongoose from "mongoose";

/**
 * An interface that describe the properties
 * required to create new ticket
 */
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

/**
 * An interface that describes the properties
 * that a Ticket Model has
 */
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

/**
 * An interface that describes the properties
 * that a Ticket Document has
 */
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false,
    },
  }
);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
