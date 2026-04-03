interface Booking {
  id: string
  guest: string
  experience: string
  date: string
  status: string
  amount: number
}

interface OperatorBookingRowProps {
  booking: Booking
}

export default function OperatorBookingRow({ booking }: OperatorBookingRowProps) {
  const statusColor = booking.status === 'Confirmed'
    ? 'bg-green-100 text-green-800'
    : booking.status === 'Pending'
    ? 'bg-yellow-100 text-yellow-800'
    : 'bg-gray-100 text-gray-800'

  return (
    <tr>
      <td className="px-6 py-4 text-sm font-mono">{booking.id}</td>
      <td className="px-6 py-4 text-sm">{booking.guest}</td>
      <td className="px-6 py-4 text-sm">{booking.experience}</td>
      <td className="px-6 py-4 text-sm">{booking.date}</td>
      <td className="px-6 py-4 text-sm">
        <span className={"px-2 py-1 rounded-full text-xs " + statusColor}>
          {booking.status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm">
        {booking.amount > 0 ? '$' + booking.amount : 'Free'}
      </td>
    </tr>
  )
}
