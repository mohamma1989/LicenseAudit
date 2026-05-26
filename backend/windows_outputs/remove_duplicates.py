import os


def find_common_lines():
    # 1. Just the file names, no long paths needed
    file_names = [
        "me_company_1.txt",
        #"me_vm_1.txt",
        "yousef_company_1.txt",
    ]

    # Dynamically gets the directory where THIS script is saved
    current_dir = os.path.dirname(os.path.abspath(__file__))
    output_name = os.path.join(current_dir, "common_lines.txt")

    common_lowercase_set = None
    casing_map = {}

    print(f"🔍 Working in directory: {current_dir}")
    print("⏳ Comparing lines...")

    for name in file_names:
        full_path = os.path.join(current_dir, name)

        if not os.path.exists(full_path):
            print(f"❌ Error: Could not find '{name}' inside {current_dir}")
            return

        current_file_set = set()

        with open(full_path, "r", encoding="utf-8") as f:
            for line in f:
                cleaned_line = line.strip()
                if cleaned_line:
                    lower_line = cleaned_line.lower()
                    current_file_set.add(lower_line)

                    if lower_line not in casing_map:
                        casing_map[lower_line] = cleaned_line

        if common_lowercase_set is None:
            common_lowercase_set = current_file_set
        else:
            common_lowercase_set = common_lowercase_set.intersection(current_file_set)

    if common_lowercase_set:
        with open(output_name, "w", encoding="utf-8") as out_file:
            for lower_line in sorted(common_lowercase_set):
                original_line = casing_map[lower_line]
                out_file.write(f"{original_line}\n")

        print(f"✅ Success! Found {len(common_lowercase_set)} common lines.")
        print(f"Saved results to: '{output_name}'")
    else:
        print("ℹ️ Finished scanning, but no lines matched across all 6 files.")


find_common_lines()
