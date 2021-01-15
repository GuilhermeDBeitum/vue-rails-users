class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  skip_before_action :verify_authenticity_token

  # GET /users
  # GET /users.json
  def index
    @users = User.all
    render json: @users 
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @user = User.find(params[:id])
    render json: { data: @user, status: :ok, message: 'Success' }
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)
    if @user.save
      render json: { status: :ok, message: 'Success Saved' }
    else
      render json: { json: @user.errors, status: :unprocessable_entity }
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render json: { status: :ok, message: 'Success Updated' }
    else
      render json: { json: @user.errors, status: :unprocessable_entity }
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      render json: { json: 'Success Deleted'}
    else
      render json: { json: @user.errors, status: :unprocessable_entity }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:user, :email)
    end
end
