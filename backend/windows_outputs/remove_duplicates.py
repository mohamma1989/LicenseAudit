import os
import shutil

def remove_common_lines():
    # 1. Define the 6 files and the common lines file
    file_names = [
        "me_company_1.txt",
        "me_company_2.txt",  # Kept the name exactly as it shows on your disk
        "me_vm_1.txt",
        "me_vm_2.txt",
        "yousef_company_1.txt",
        "yousef_company_2.txt",
    ]
    common_file_name = "common_lines.txt"
    
    # Dynamically get the directory where this script runs
    current_dir = os.path.dirname(os.path.abspath(__file__))
    common_file_path = os.path.join(current_dir, common_file_name)
    
    # Check if common_lines.txt exists first
    if not os.path.exists(common_file_path):
        print(f"❌ Error: Could not find '{common_file_name}' inside {current_dir}")
        print("Please run your comparison script first to generate it.")
        return

    # 2. Read lines to remove and store them as lowercase for case-insensitive matching
    lines_to_remove = set()
    with open(common_file_path, "r", encoding="utf-8") as f:
        for line in f:
            cleaned = line.strip().lower()
            if cleaned:
                lines_to_remove.add(cleaned)
                
    print(f"🔍 Loaded {len(lines_to_remove)} unique lines to remove from 'common_lines.txt'.")
    print("⏳ Processing files...")

    # 3. Loop through each of the 6 files and filter them
    for name in file_names:
        full_path = os.path.join(current_dir, name)
        
        if not os.path.exists(full_path):
            print(f"⚠️ Warning: Skipping '{name}', file not found.")
            continue
            
        # Create a backup copy first (safety first!)
        backup_path = full_path + ".bak"
        shutil.copyfile(full_path, backup_path)
        
        remaining_lines = []
        lines_removed_count = 0
        
        # Read the file and filter out common lines
        with open(full_path, "r", encoding="utf-8") as f:
            for line in f:
                # Keep original formatting/newlines for lines we aren't removing
                cleaned_line = line.strip().lower()
                
                if cleaned_line in lines_to_remove:
                    lines_removed_count += 1
                else:
                    remaining_lines.append(line)
                    
        # Overwrite the original file with the filtered lines
        with open(full_path, "w", encoding="utf-8") as f:
            f.writelines(remaining_lines)
            
        print(f"✅ Modified '{name}': Removed {lines_removed_count} lines. (Backup saved as .bak)")

    print("\n🎉 Done! All 6 files have been cleaned up successfully.")

if __name__ == "__main__":
    remove_common_lines()