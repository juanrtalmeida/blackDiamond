defmodule BackendWeb.Router do
  use BackendWeb, :router

  alias BackendWeb.{AuthPlug, AdminPlug}

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :auth do
    plug AuthPlug
  end

  pipeline :admin do
    plug AdminPlug
  end

  scope "/api", BackendWeb do
    pipe_through [:auth, :admin, :api]

    post "/create-professor", ProfessorController, :create
    post "/create-martial-art", ManagementController, :create

    get "/get-photo/:photo_name", NewsController, :get_photo
    # required params
    # {
    # "user_id":"xxxxxx",
    # "amount":0,
    # "type":"entry"
    # ,"description":"xxxxxxxx"
    # ,"date":"9999-90-99",
    # "value":150.3
    # }
    post "/new/transaction", ManagementController, :new_transaction

    get "/transactions/:starting_date/:ending_date", ManagementController, :get_transactions
    # required params
    # {
    # name: "Price name",
    # description: ["Price description", "another description"],
    # price: 100.00,
    # }
    # returns: 200 {
    #  message: "Preço criado com sucesso"
    # }
    post "/prices", ManagementController, :new_price
    delete "/prices/:id", ManagementController, :delete_price
    post "/class/create", ClassController, :handle_creation
    post "/class/add/student", ClassController, :add_student
    get "/class/:id", ClassController, :get_class
  end

  scope "/api", BackendWeb do
    pipe_through [:auth, :api]

    post "/create/news", NewsController, :create

    # required params
    # {}
    # returns: 200 { "adress": "av tavares bastos", "adress_number": "000", "birth_date": "1997-07-11",
    # "contact": "00000000","cpf": "000.000.000-00","email": "000000@gmail.com","emergency_contact": "0000000000"
    # ,"expire_date_end": null,"expire_date_start": null,"id": "34c33150-2d44-4e32-a54b-b12e5b19e04a",
    # "name": "Your name","privileges": "admin","rg": "000000","zip_code": "000000"}
    get "/me", UsersController, :infos

    post "/mail/validation", UsersController, :validation
  end

  scope "/api", BackendWeb do
    pipe_through :api

    # required params
    # {
    #  email
    #  password
    #  name
    #  cpf
    #  rg
    #  adress
    #  adress_number
    #  zip_code
    #  birth_date
    #  emergency_contact
    #  contact
    # }
    post "/register", UsersController, :create

    # {
    #  body:
    #  email
    #  password
    #
    #  headers:{
    #    Authorization: "Bearer {token}"
    #  }

    # returns: 200 body:{} headers:{token: token}
    # }

    post "/login", UsersController, :login
    get "/news", NewsController, :get_all

    get "/martial-arts", ManagementController, :show
    get "/prices", ManagementController, :show_prices
    match :*, "/*path", ErrorController, :not_found
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: BackendWeb.Telemetry
    end
  end

  if Mix.env() == :dev do
    # If using Phoenix
    forward "/sent_emails", Bamboo.SentEmailViewerPlug
  end
end
