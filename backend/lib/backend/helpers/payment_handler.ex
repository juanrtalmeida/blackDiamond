defmodule Backend.Helpers.PaymentHandler do
  alias Backend.Models.MonthPayment
  alias Backend.Repo

  def validate_this_month(payment_list, id) do
    date = get_month_and_year()

    has_this_month_payment =
      Enum.any?(payment_list, fn payment ->
        payment.month == date.month &&
          payment.year == date.year
      end)

    if has_this_month_payment do
      payment_list
    else
      with {:ok, payment} <-
             MonthPayment.create_changeset(%{
               user_id: id,
               month: Integer.to_string(date.month),
               year: Integer.to_string(date.year),
               paid: false
             })
             |> Repo.insert() do
        payment_list ++ [%{month: date.month, year: date.year, paid: false, id: payment.id}]
      else
        _ -> payment_list
      end
    end
  end

  def verify_payment(payment_list, id) do
    this_date = get_month_and_year()

    validate_this_month(payment_list, id)
    |> Enum.any?(fn payment ->
      payment.month == this_date.month && payment.year == this_date.year && payment.paid == true
    end)
  end

  defp get_month_and_year do
    today_date = DateTime.utc_now() |> DateTime.add(-3, :hour)
    today_month = today_date.month
    today_year = today_date.year
    %{month: Integer.to_string(today_month), year: Integer.to_string(today_year)}
  end
end
