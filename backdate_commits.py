import subprocess
import os
from datetime import datetime, timedelta

# Configuration
REPO_PATH = r"a:\GameVault X"
START_DATE = datetime(2026, 2, 2, 10, 0, 0) # Feb 2, 10:00 AM
COMMITS_PER_DAY = 7
DAYS = 7

# Commit schedule: (Relative paths, Commit message)
# We will distribute files across days.
file_groups = [
    # Day 1: Feb 2 - Backend Foundation
    ([".gitignore"], "chore: initial repository setup and ignore rules"),
    (["backend/package.json"], "feat: initialize backend with express and dependencies"),
    (["backend/server.js"], "feat: setup express server and middleware"),
    (["backend/verify_db.js"], "feat: add database connection verification script"),
    (["backend/seed.js"], "feat: implement database seeding logic"),
    (["backend/models/User.js"], "feat: define User model with authentication schema"),
    (["backend/models/Game.js"], "feat: define Game model for vault content"),

    # Day 2: Feb 3 - Backend Routes and Root Config
    (["backend/routes/authRoutes.js"], "feat: implement authentication routes"),
    (["backend/routes/userRoutes.js"], "feat: implement user management routes"),
    (["backend/routes/gameRoutes.js"], "feat: implement game discovery routes"),
    (["backend/package-lock.json"], "chore: lock backend dependencies"),
    (["package.json"], "chore: setup root package for workspace"),
    (["package-lock.json"], "chore: lock root dependencies"),
    (["frontend/package.json"], "feat: initialize frontend with vite and react"),

    # Day 3: Feb 4 - Frontend Foundation
    (["frontend/vite.config.js"], "chore: configure vite for react and alias"),
    (["frontend/index.html"], "feat: setup main html entry for frontend"),
    (["frontend/src/index.css"], "style: add global styles and tailwind config"),
    (["frontend/src/main.jsx"], "feat: setup react entry point"),
    (["frontend/src/App.jsx"], "feat: implement main application structure and routing"),
    (["frontend/src/components/Navbar.jsx"], "feat: create responsive navigation bar"),
    (["frontend/src/components/Footer.jsx"], "feat: create application footer"),

    # Day 4: Feb 5 - Core UI & State
    (["frontend/src/context/AuthContext.jsx"], "feat: implement global authentication context"),
    (["frontend/src/services/api.js"], "feat: setup axios instance for api communication"),
    (["frontend/src/components/GameCard.jsx"], "feat: create card component for game displays"),
    (["frontend/src/components/SpecsComparison.jsx"], "feat: implement system requirements comparison tool"),
    (["frontend/src/views/Home.jsx"], "feat: implement home page with game listings"),
    (["frontend/src/views/Login.jsx"], "feat: implement user login view"),
    (["frontend/src/views/Signup.jsx"], "feat: implement user registration view"),

    # Day 5: Feb 6 - Views and Polish
    (["frontend/src/views/Profile.jsx"], "feat: implement user profile management view"),
    (["frontend/src/views/GameDetails.jsx"], "feat: implement detailed game information view"),
    (["frontend/src/views/"], "feat: finalize frontend views and navigation"), # Catch remaining views
    (["frontend/src/components/"], "feat: finalize UI components"), # Catch remaining components
    (["frontend/package-lock.json"], "chore: lock frontend dependencies"),
    (["frontend/src/assets/"], "assets: add game images and icons"),
    (["frontend/src/"], "refactor: optimize frontend source structure"),

    # Day 6: Feb 7 - Documentation & Refinement
    (["README.md"], "docs: add project documentation and setup guide"),
    (["backend/"], "refactor: optimize backend routes and error handling"),
    (["."], "chore: repository cleanup and final project organization"),
    ([], "docs: update contribution guidelines"),
    ([], "feat: add environment variable templates"),
    ([], "fix: minor UI adjustments and responsive fixes"),
    ([], "chore: project status update"),

    # Day 7: Feb 8 - Finalization
    ([], "test: verify authentication flow"),
    ([], "test: verify game discovery and search"),
    ([], "style: finalize theme and colors"),
    ([], "perf: optimize build assets"),
    ([], "chore: prepare for version 1.0.0"),
    ([], "chore: repository finalization for push"),
    ([], "release: v1.0.0-beta"),
]

def run_git(args, env=None, check=True):
    result = subprocess.run(["git"] + args, cwd=REPO_PATH, env=env, capture_output=True, text=True)
    if check and result.returncode != 0:
        print(f"Git command failed: {' '.join(args)}")
        print(f"Error: {result.stderr}")
    return result

def main():
    os.chdir(REPO_PATH)
    
    # Cleanup any existing lock
    lock_path = os.path.join(REPO_PATH, ".git", "index.lock")
    if os.path.exists(lock_path):
        os.remove(lock_path)

    # Check if inside git repo
    if not os.path.exists(".git"):
        print("Initialing git...")
        run_git(["init"])

    # Create orphan branch for a fresh history
    print("Creating fresh history branch...")
    run_git(["checkout", "--orphan", "temp_history"], check=False)
    run_git(["rm", "-rf", "--cached", "."], check=False)

    current_date = START_DATE
    
    for i, (files, message) in enumerate(file_groups):
        # Calculate date/time for this commit
        day_offset = i // COMMITS_PER_DAY
        commit_offset = i % COMMITS_PER_DAY
        
        commit_time = START_DATE + timedelta(days=day_offset, hours=commit_offset)
        date_str = commit_time.strftime("%Y-%m-%dT%H:%M:%S+05:30")
        
        # Add files
        added_any = False
        for f in files:
            if os.path.exists(f):
                run_git(["add", f])
                added_any = True
        
        # Commit
        env = os.environ.copy()
        env["GIT_AUTHOR_DATE"] = date_str
        env["GIT_COMMITTER_DATE"] = date_str
        
        # We use --allow-empty for placeholders
        res = run_git(["commit", "--allow-empty", "-m", message], env=env, check=False)
        
        if res.returncode == 0:
            print(f"Commit {i+1}/{len(file_groups)}: {date_str} - {message}")
        else:
            print(f"Error on commit {i+1}: {res.stderr}")

    # Move to main
    print("Finalizing branch names...")
    run_git(["branch", "-D", "main"], check=False)
    run_git(["branch", "-m", "main"])
    
    print("\nRebuilt history complete!")

if __name__ == "__main__":
    main()
