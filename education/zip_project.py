import os
import zipfile

def package_project():
    output_filename = "pere_hackathon_project.zip"
    project_dir = os.path.dirname(os.path.abspath(__file__))
    
    ignore_dirs = {'.git', 'node_modules', '__pycache__', '.venv', '.gemini'}
    ignore_files = {output_filename, '.DS_Store'}

    print(f"Creating zip package: {output_filename}...")
    
    with zipfile.ZipFile(output_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(project_dir):
            # Remove ignored directories in-place
            dirs[:] = [d for d in dirs if d not in ignore_dirs]
            
            for file in files:
                if file in ignore_files:
                    continue
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, project_dir)
                zipf.write(full_path, rel_path)
                print(f"  + Added {rel_path}")

    print(f"Successfully packaged {output_filename} ({os.path.getsize(output_filename)} bytes)!")

if __name__ == "__main__":
    package_project()
