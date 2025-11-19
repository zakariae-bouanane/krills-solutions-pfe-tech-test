# Paths
BACKEND_DIR=backend
FRONTEND_DIR=frontend

# -------------------------------------------------
# Install dependencies (backend + frontend)
# -------------------------------------------------
install:
	@echo "Installing backend dependencies..."
	cd $(BACKEND_DIR) && mvn clean install -DskipTests
	@echo "Installing frontend dependencies..."
	cd $(FRONTEND_DIR) && npm install

# -------------------------------------------------
# Run backend (Quarkus)
# -------------------------------------------------
run-backend:
	cd $(BACKEND_DIR) && mvn quarkus:dev

# -------------------------------------------------
# Run frontend (React)
# -------------------------------------------------
run-frontend:
	cd $(FRONTEND_DIR) && npm run dev

# -------------------------------------------------
# Run both backend + frontend
# -------------------------------------------------
run:
	@echo "Starting backend..."
	@start cmd /c "cd $(BACKEND_DIR) && mvn quarkus:dev"
	@echo "Starting frontend..."
	cd $(FRONTEND_DIR) && npm run dev

# -------------------------------------------------
# Clean project
# -------------------------------------------------
clean:
	cd $(BACKEND_DIR) && mvn clean
	cd $(FRONTEND_DIR) && rm -rf node_modules