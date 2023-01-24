defmodule BackendWeb.ManagementView do
  use BackendWeb, :view

  def render("create.json", %{name: martial_art}),
    do: %{
      message: "Arte marcial criada com sucesso",
      martial_art: %{
        name: martial_art
      }
    }

  def render("show.json", %{martial_arts: result}) do
    result
  end

  def render("new_price.json", _) do
    %{
      message: "Preço criado com sucesso"
    }
  end

  def render("show_prices.json", %{prices: prices}) do
    prices
  end

  def render("delete_price.json", _) do
    %{
      message: "Preço deletado com sucesso"
    }
  end

  def render("new_transaction.json", _) do
    %{
      message: "Transação criada com sucesso"
    }
  end

  def render("get_transactions.json", %{transactions: transactions}) do
    transactions
  end
end
