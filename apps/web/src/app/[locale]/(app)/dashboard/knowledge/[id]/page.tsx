"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@raypx/ui/components/alert-dialog";
import { Badge } from "@raypx/ui/components/badge";
import { Button } from "@raypx/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@raypx/ui/components/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@raypx/ui/components/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@raypx/ui/components/dropdown-menu";
import { Input } from "@raypx/ui/components/input";
import { Label } from "@raypx/ui/components/label";
import { Textarea } from "@raypx/ui/components/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowLeft, Calendar, FileText, MoreHorizontal, Plus, Trash2, Upload } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type KnowledgeBase = {
  id: string;
  name: string;
  description?: string;
  status: "active" | "inactive" | "archived";
  createdAt: string;
  updatedAt: string;
};

type Document = {
  id: string;
  name: string;
  originalName: string;
  mimeType: string;
  size: number;
  status: "processing" | "completed" | "failed";
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

// API functions
const fetchKnowledgeBase = async (id: string | null): Promise<KnowledgeBase> => {
  if (!id) {
    throw new Error("Knowledge base ID is required");
  }
  const response = await fetch(`/api/v1/knowledges/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch knowledge base");
  }
  const data = await response.json();
  return data.data;
};

const fetchDocuments = async (knowledgeBaseId: string | null): Promise<Document[]> => {
  if (!knowledgeBaseId) {
    throw new Error("Knowledge base ID is required");
  }

  const response = await fetch(`/api/v1/knowledges/${knowledgeBaseId}/documents`);
  if (!response.ok) {
    throw new Error("Failed to fetch documents");
  }
  const data = await response.json();
  return data.data;
};

const uploadDocument = async (
  knowledgeBaseId: string | null,
  data: { name: string; content: string }
) => {
  if (!knowledgeBaseId) {
    throw new Error("Knowledge base ID is required");
  }

  const response = await fetch(`/api/v1/knowledges/${knowledgeBaseId}/documents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to upload document");
  }
  return response.json();
};

const deleteDocument = async (knowledgeBaseId: string | null, documentId: string) => {
  if (!knowledgeBaseId) {
    throw new Error("Knowledge base ID is required");
  }

  const response = await fetch(`/api/v1/knowledges/${knowledgeBaseId}/documents/${documentId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete document");
  }
  return response.json();
};

export default function KnowledgeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [knowledgeBaseId, setKnowledgeBaseId] = useState<string | null>(null);

  // Extract the id from params when component mounts
  useEffect(() => {
    params.then((resolvedParams) => {
      setKnowledgeBaseId(resolvedParams.id);
    });
  }, [params]);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [uploadForm, setUploadForm] = useState({ name: "", content: "" });

  const queryClient = useQueryClient();

  // Queries
  const { data: knowledgeBase, isLoading: isLoadingKb } = useQuery({
    queryKey: ["knowledge", knowledgeBaseId],
    queryFn: () => fetchKnowledgeBase(knowledgeBaseId),
    enabled: !!knowledgeBaseId,
  });

  const { data: documents = [], isLoading: isLoadingDocs } = useQuery({
    queryKey: ["documents", knowledgeBaseId],
    queryFn: () => fetchDocuments(knowledgeBaseId),
    enabled: !!knowledgeBaseId,
  });

  // Mutations
  const uploadMutation = useMutation({
    mutationFn: (data: { name: string; content: string }) => uploadDocument(knowledgeBaseId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["documents", knowledgeBaseId],
      });
      setIsUploadDialogOpen(false);
      setUploadForm({ name: "", content: "" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (documentId: string) => deleteDocument(knowledgeBaseId, documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["documents", knowledgeBaseId],
      });
      setIsDeleteDialogOpen(false);
    },
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadForm.name.trim() && uploadForm.content.trim()) {
      uploadMutation.mutate(uploadForm);
    }
  };

  const handleDelete = (document: Document) => {
    setSelectedDocument(document);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedDocument) {
      deleteMutation.mutate(selectedDocument.id);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
  };

  if (!knowledgeBaseId || isLoadingKb) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-gray-900 border-b-2" />
      </div>
    );
  }

  if (!knowledgeBase) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Knowledge base not found</p>
          <Link href="/dashboard/knowledge">
            <Button className="mt-2" variant="outline">
              Back to Knowledge Bases
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/knowledge">
            <Button size="sm" variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="font-semibold text-2xl">{knowledgeBase.name}</h1>
            <p className="text-muted-foreground">{knowledgeBase.description || "No description"}</p>
            <div className="mt-2 flex items-center gap-2">
              <Badge className={getStatusBadgeColor(knowledgeBase.status)} variant="outline">
                {knowledgeBase.status}
              </Badge>
              <span className="text-muted-foreground text-sm">
                Updated {format(new Date(knowledgeBase.updatedAt), "MMM d, yyyy")}
              </span>
            </div>
          </div>
        </div>
        <Dialog onOpenChange={setIsUploadDialogOpen} open={isUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>
                Add a new document to this knowledge base. The content will be automatically
                processed and chunked for search.
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleUploadSubmit}>
              <div>
                <Label htmlFor="name">Document Name *</Label>
                <Input
                  id="name"
                  onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                  placeholder="Enter document name"
                  required
                  value={uploadForm.name}
                />
              </div>
              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  className="resize-none"
                  id="content"
                  onChange={(e) => setUploadForm({ ...uploadForm, content: e.target.value })}
                  placeholder="Paste or type your document content here..."
                  required
                  rows={10}
                  value={uploadForm.content}
                />
                <p className="mt-1 text-muted-foreground text-sm">
                  Current length: {uploadForm.content.length} characters
                </p>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => setIsUploadDialogOpen(false)}
                  type="button"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  disabled={
                    uploadMutation.isPending ||
                    !uploadForm.name.trim() ||
                    !uploadForm.content.trim()
                  }
                  type="submit"
                >
                  {uploadMutation.isPending ? "Uploading..." : "Upload"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Documents */}
      <div>
        <h2 className="mb-4 font-medium text-lg">Documents</h2>
        {isLoadingDocs ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card className="animate-pulse" key={i}>
                <CardHeader>
                  <div className="h-5 w-3/4 rounded bg-gray-200" />
                  <div className="h-4 w-1/2 rounded bg-gray-200" />
                </CardHeader>
                <CardContent>
                  <div className="mb-2 h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-2/3 rounded bg-gray-200" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : documents.length === 0 ? (
          <div className="py-12 text-center">
            <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 font-medium text-lg">No documents yet</h3>
            <p className="mb-4 text-muted-foreground">
              Upload your first document to get started with this knowledge base.
            </p>
            <Button onClick={() => setIsUploadDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc) => (
              <Card className="transition-shadow hover:shadow-md" key={doc.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="line-clamp-1 text-base">{doc.name}</CardTitle>
                      <CardDescription className="text-sm">{doc.originalName}</CardDescription>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge className={getStatusBadgeColor(doc.status)} variant="outline">
                          {doc.status}
                        </Badge>
                        <span className="text-muted-foreground text-xs">
                          {formatFileSize(doc.size)}
                        </span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(doc)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-muted-foreground text-xs">
                    <Calendar className="mr-1 h-3 w-3" />
                    {format(new Date(doc.createdAt), "MMM d, yyyy 'at' HH:mm")}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete Dialog */}
      <AlertDialog onOpenChange={setIsDeleteDialogOpen} open={isDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Document</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedDocument?.name}"? This action cannot be
              undone and will also delete all associated chunks and data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteMutation.isPending}
              onClick={confirmDelete}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
