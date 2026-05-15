#!/usr/bin/env python3

import re
import sys
import time
from pathlib import Path


TASKS_HEADER = "Tasks to be executed:"
TASK_PATTERN = re.compile(r"task '([^']+)'")
DONE_PATTERN = re.compile(r"^\s*> Task (:[^\s]+)", re.MULTILINE)
FAILURE_PATTERN = re.compile(r"^FAILURE: Build failed with an exception\.$", re.MULTILINE)
SUCCESS_PATTERN = re.compile(r"^BUILD SUCCESSFUL\b", re.MULTILINE)


def render_bar(percent: float, width: int = 32) -> str:
    percent = max(0.0, min(100.0, percent))
    filled = int(width * percent / 100)
    return "[" + "#" * filled + "-" * (width - filled) + "]"


def parse_tasks(text: str) -> list[str]:
    header_index = text.find(TASKS_HEADER)
    if header_index == -1:
        return []

    tail = text[header_index:]
    end_index = tail.find("]\n")
    if end_index == -1:
        end_index = len(tail)
    block = tail[: end_index + 1]
    return TASK_PATTERN.findall(block)


def parse_done_tasks(text: str) -> list[str]:
    seen = set()
    ordered = []
    for match in DONE_PATTERN.finditer(text):
        task = match.group(1)
        if task not in seen:
            seen.add(task)
            ordered.append(task)
    return ordered


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: android_build_progress.py <build-log-path>", file=sys.stderr)
        return 2

    log_path = Path(sys.argv[1])
    if not log_path.exists():
        print(f"Log file not found: {log_path}", file=sys.stderr)
        return 1

    while True:
        text = log_path.read_text(errors="ignore")
        total_tasks = parse_tasks(text)
        done_tasks = parse_done_tasks(text)
        total = len(total_tasks)
        done = len(done_tasks)
        percent = (done / total * 100) if total else 0.0
        last_task = done_tasks[-1] if done_tasks else "waiting for first task"

        lines = [
            "\x1b[2J\x1b[H",
            "Android build progress",
            f"log: {log_path}",
            f"{render_bar(percent)} {percent:5.1f}%",
            f"tasks: {done}/{total if total else '?'}",
            f"last completed: {last_task}",
        ]

        if FAILURE_PATTERN.search(text):
            lines.append("status: FAILED")
            print("\n".join(lines), end="\n", flush=True)
            return 1

        if SUCCESS_PATTERN.search(text):
            lines.append("status: SUCCESS")
            print("\n".join(lines), end="\n", flush=True)
            return 0

        lines.append("status: RUNNING")
        print("\n".join(lines), end="\n", flush=True)
        time.sleep(1)


if __name__ == "__main__":
    raise SystemExit(main())
